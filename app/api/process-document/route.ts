import { NextResponse } from 'next/server';
import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';
import pdfParse from 'pdf-parse';

interface ProgressCallback {
  status: string;
  name: string;
  file?: string;
}

interface FirestoreFieldValue {
  stringValue?: string;
  integerValue?: number;
  doubleValue?: number;
  timestampValue?: string;
  arrayValue?: {
    values: FirestoreFieldValue[];
  };
}

interface FirestoreResponse {
  error?: {
    code: number;
    message: string;
    status: string;
  };
  name?: string;
  fields?: Record<string, FirestoreFieldValue>;
}

function cleanText(text: string): string {
  return text
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/[^\x20-\x7E\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\u2000-\u206F\u20A0-\u20CF]/g, ' ') // Keep only printable characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Simple text splitter function
function splitText(text: string, chunkSize: number = 1000): string[] {
  // Clean and normalize the text first
  const cleanedText = cleanText(text);
  
  const sentences = cleanedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chunks: string[] = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();
    if (!trimmedSentence) continue;

    if (currentChunk.length + trimmedSentence.length > chunkSize) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = trimmedSentence;
    } else {
      currentChunk += (currentChunk ? ' ' : '') + trimmedSentence;
    }
  }
  
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks.filter(chunk => chunk.length > 0);
}

// Initialize the embedding model
let embedder: FeatureExtractionPipeline | null = null;

async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true,
      progress_callback: (progress: ProgressCallback) => {
        console.log('Model loading progress:', progress);
      }
    });
  }
  return embedder;
}

async function storeDocument(projectId: string, accessToken: string, documentId: string, filename: string) {
  const documentsEndpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/documents`;
  
  console.log('Storing document metadata at:', documentsEndpoint);
  
  try {
    const response = await fetch(documentsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        fields: {
          id: { stringValue: documentId },
          filename: { stringValue: filename },
          createdAt: { timestampValue: new Date().toISOString() }
        }
      })
    });

    const responseData = await response.json() as FirestoreResponse;
    console.log('Document storage response:', JSON.stringify(responseData, null, 2));

    if (!response.ok) {
      throw new Error(`Failed to store document metadata: ${responseData.error?.message || 'Unknown error'}`);
    }

    // Extract the Firestore document ID from the response name
    const firestoreId = responseData.name?.split('/').pop();
    if (!firestoreId) {
      throw new Error('Failed to get Firestore document ID from response');
    }

    return firestoreId;
  } catch (error) {
    console.error('Error storing document:', error);
    throw error;
  }
}

async function storeChunk(chunk: string, index: number, embedding: number[], documentId: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const endpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/chunks`;
  
  console.log(`Storing chunk ${index} at: ${endpoint}`);
  console.log(`Chunk ${index} length: ${chunk.length}`);
  console.log(`Chunk ${index} preview: ${chunk.substring(0, 100)}`);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.FIREBASE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      fields: {
        text: { stringValue: chunk },
        embedding: {
          arrayValue: {
            values: embedding.map(value => ({ doubleValue: value }))
          }
        },
        index: { integerValue: index.toString() },
        documentId: { stringValue: documentId }
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to store chunk ${index}: ${errorText}`);
  }

  return response.json();
}

async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
  try {
    // Convert ArrayBuffer to Buffer for pdf-parse
    const data = Buffer.from(buffer);
    
    // Parse PDF
    const result = await pdfParse(data, {
      max: 0, // No page limit
      version: 'v2.0.550'
    });
    
    console.log(`PDF has ${result.numpages} pages`);
    return result.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Extract text from file
    let text: string;
    try {
      text = await file.text();
      console.log('Text extracted successfully');
    } catch (error) {
      console.error('Error extracting text:', error);
      return NextResponse.json(
        { error: 'Failed to extract text from file. Please ensure it is a valid text or PDF file.' },
        { status: 400 }
      );
    }

    // Clean and normalize the text
    const cleanedText = cleanText(text);

    if (cleanedText.length === 0) {
      return NextResponse.json(
        { error: 'No valid text content found in document' },
        { status: 400 }
      );
    }

    console.log('Text preview:', cleanedText.substring(0, 200));

    // Split text into chunks
    const chunks = splitText(cleanedText);

    if (chunks.length === 0) {
      return NextResponse.json(
        { error: 'No valid text chunks found in document' },
        { status: 400 }
      );
    }

    console.log('Processing chunks:', chunks.length);
    console.log('First chunk preview:', chunks[0].substring(0, 100));

    try {
      console.log('Generating embeddings...');

      // Get the embedder
      const embedder = await getEmbedder();
      if (!embedder) {
        throw new Error('Failed to initialize embedder');
      }

      // Generate embeddings for each chunk
      const embeddingsList = await Promise.all(
        chunks.map(async (chunk) => {
          const result = await embedder(chunk, {
            pooling: 'mean',
            normalize: true,
          });
          return Array.from(result.data);
        })
      );
      
      console.log('Embeddings generated');

      // Generate a unique ID for the document
      const documentId = crypto.randomUUID();
      
      // Get configuration
      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      if (!projectId) {
        throw new Error('Firebase project ID is not configured');
      }

      const accessToken = process.env.FIREBASE_ACCESS_TOKEN;
      if (!accessToken) {
        throw new Error('Firebase access token is not configured');
      }

      console.log('Storing document...');
      console.log('Project ID:', projectId);
      console.log('Document ID:', documentId);

      // Store document metadata and get Firestore ID
      console.log('Attempting to store document metadata...');
      const firestoreDocId = await storeDocument(projectId, accessToken, documentId, file.name);
      console.log('Document metadata stored successfully with Firestore ID:', firestoreDocId);

      // Store chunks and embeddings
      console.log('Attempting to store chunks...');
      const chunkResults = await Promise.allSettled(
        chunks.map((chunk, index) =>
          storeChunk(chunk, index, embeddingsList[index], documentId)
        )
      );

      // Check for any failed chunks
      const failedChunks = chunkResults.filter(result => result.status === 'rejected');
      if (failedChunks.length > 0) {
        console.error('Some chunks failed to store:', failedChunks);
        throw new Error(`Failed to store ${failedChunks.length} chunks`);
      }

      console.log('All chunks stored successfully');

      return NextResponse.json({
        success: true,
        documentId,
        firestoreDocId,
        chunks: chunks.length,
      });
    } catch (modelError) {
      console.error('Model error:', modelError);
      throw new Error(`Model processing failed: ${(modelError as Error).message}`);
    }
  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process document: ' + (error as Error).message,
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 