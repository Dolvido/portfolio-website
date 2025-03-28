import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';

// Use the library's FeatureExtractionPipeline type instead of our custom one
let embedder: FeatureExtractionPipeline | null = null;

async function getEmbedder() {
  if (!embedder) {
    try {
      // Create the pipeline without type assertion
      embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        quantized: true,
        progress_callback: (progress: { status: string; name: string; file?: string }) => {
          console.log('Model loading progress:', progress);
        }
      });
    } catch (error) {
      console.error('Error loading embedder:', error);
      return null;
    }
  }
  return embedder;
}

// Clean and normalize text
function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .replace(/[^\S\r\n]+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

// Split text into chunks
function splitText(text: string, maxChunkSize: number = 512): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > maxChunkSize) {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += ' ' + sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

// Store document metadata in Firestore
async function storeDocument(
  projectId: string,
  accessToken: string,
  documentId: string,
  fileName: string
): Promise<string> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/documents`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        id: { stringValue: documentId },
        fileName: { stringValue: fileName },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() },
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to store document: ${response.statusText}`);
  }

  const data = await response.json();
  return data.name.split('/').pop() || documentId;
}

// Store chunk in Firestore
async function storeChunk(
  text: string,
  index: number,
  embedding: number[],
  documentId: string
): Promise<void> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const accessToken = process.env.FIREBASE_ACCESS_TOKEN;

  if (!projectId || !accessToken) {
    throw new Error('Firebase configuration is missing');
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/chunks`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        documentId: { stringValue: documentId },
        index: { integerValue: index.toString() },
        text: { stringValue: text },
        embedding: { arrayValue: { values: embedding.map(v => ({ doubleValue: v })) } },
        createdAt: { timestampValue: new Date().toISOString() },
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to store chunk: ${response.statusText}`);
  }
}

export async function processDocument(file: File) {
  try {
    // Extract text from file
    let text: string;
    try {
      text = await file.text();
      console.log('Text extracted successfully');
    } catch (error) {
      console.error('Error extracting text:', error);
      throw new Error('Failed to extract text from file. Please ensure it is a valid text or PDF file.');
    }

    // Clean and normalize the text
    const cleanedText = cleanText(text);

    if (cleanedText.length === 0) {
      throw new Error('No valid text content found in document');
    }

    console.log('Text preview:', cleanedText.substring(0, 200));

    // Split text into chunks
    const chunks = splitText(cleanedText);

    if (chunks.length === 0) {
      throw new Error('No valid text chunks found in document');
    }

    console.log('Processing chunks:', chunks.length);
    console.log('First chunk preview:', chunks[0].substring(0, 100));

    // Generate embeddings
    console.log('Generating embeddings...');
    const modelEmbedder = await getEmbedder();
    if (!modelEmbedder) {
      throw new Error('Failed to initialize embedder');
    }

    // Process chunks in smaller batches to manage memory
    const batchSize = 5;
    const embeddingsList: number[][] = [];
    
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batchChunks = chunks.slice(i, i + batchSize);
      const batchEmbeddings = await Promise.all(
        batchChunks.map(async (chunk) => {
          const result = await modelEmbedder(chunk, {
            pooling: 'mean',
          });
          return Array.from(result.data);
        })
      );
      embeddingsList.push(...batchEmbeddings);
    }

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

    // Store document metadata and get Firestore ID
    console.log('Storing document...');
    const firestoreDocId = await storeDocument(projectId, accessToken, documentId, file.name);
    console.log('Document metadata stored successfully with Firestore ID:', firestoreDocId);

    // Store chunks and embeddings
    console.log('Storing chunks...');
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

    return {
      success: true,
      documentId,
      firestoreDocId,
      chunks: chunks.length,
    };
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
} 