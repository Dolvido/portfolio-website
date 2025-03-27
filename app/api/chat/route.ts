import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();

interface ChatRequest {
  message: string;
  documentId: string;
}

interface ChunkData {
  text: string;
  embedding: number[];
  index: number;
}

interface ChunkScore {
  score: number;
  idx: number;
}

interface FirestoreDocumentFields {
  text: { stringValue: string };
  embedding: { arrayValue: { values: Array<{ doubleValue: number }> } };
  index: { integerValue: string };
  documentId: { stringValue: string };
}

interface FirestoreQueryResult {
  document?: {
    fields?: FirestoreDocumentFields;
  };
}

// Rate limiting middleware
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // requests per minute

  const current = rateLimit.get(ip) || { count: 0, timestamp: now };
  
  // Reset if window has passed
  if (now - current.timestamp > windowMs) {
    current.count = 1;
    current.timestamp = now;
  } else {
    current.count++;
  }
  
  rateLimit.set(ip, current);
  return current.count <= maxRequests;
}

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 5, delayMs = 2000): Promise<Response> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 503) {
        if (attempt < maxRetries) {
          console.log(`Model loading (attempt ${attempt}/${maxRetries}), retrying...`);
          // Exponential backoff with jitter
          const jitter = Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, (delayMs * Math.pow(1.5, attempt - 1)) + jitter));
          continue;
        }
        throw new Error('The AI model is still initializing. Please wait a moment and try again.');
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      console.log(`Request failed (attempt ${attempt}/${maxRetries}), retrying...`);
      const jitter = Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, (delayMs * Math.pow(1.5, attempt - 1)) + jitter));
    }
  }
  throw new Error('The service is temporarily unavailable. Please try again in a few moments.');
}

export async function POST(req: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json() as ChatRequest;
    const { message, documentId } = body;

    if (!documentId) {
      return NextResponse.json(
        { error: 'No document ID provided' },
        { status: 400 }
      );
    }

    // Get chunks from Firestore via REST API
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const firestoreEndpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;
    
    const firestoreResponse = await fetch(`${firestoreEndpoint}:runQuery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FIREBASE_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'chunks' }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'documentId' },
              op: 'EQUAL',
              value: { stringValue: documentId }
            }
          }
        }
      })
    });

    if (!firestoreResponse.ok) {
      const errorText = await firestoreResponse.text();
      console.error('Firestore error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch document chunks' },
        { status: 500 }
      );
    }

    const queryResults = await firestoreResponse.json() as FirestoreQueryResult[];
    
    // Filter out any results without documents or fields
    const validResults = queryResults.filter(result => 
      result.document?.fields?.text?.stringValue &&
      result.document?.fields?.embedding?.arrayValue?.values &&
      result.document?.fields?.index?.integerValue
    );

    console.log(`Processing ${validResults.length} document chunks`);

    if (validResults.length === 0) {
      return NextResponse.json(
        { error: 'No valid chunks found for this document. Please try uploading the document again.' },
        { status: 404 }
      );
    }

    // Convert to ChunkData array and sort in memory
    const chunks: ChunkData[] = validResults
      .map(result => {
        const fields = result.document?.fields;
        if (!fields) throw new Error('Invalid document structure');
        
        return {
          text: fields.text.stringValue,
          embedding: fields.embedding.arrayValue.values.map(v => Number(v.doubleValue)),
          index: Number(fields.index.integerValue)
        };
      })
      .sort((a, b) => a.index - b.index);

    try {
      // Call Hugging Face Inference API for embeddings
      const embeddingResponse = await fetchWithRetry(
        'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
          },
          body: JSON.stringify({
            inputs: {
              source_sentence: message,
              sentences: chunks.map(c => c.text)
            }
          })
        }
      );

      if (!embeddingResponse.ok) {
        const errorText = await embeddingResponse.text();
        console.error('Embedding API error:', errorText);
        
        if (embeddingResponse.status === 503) {
          return NextResponse.json(
            { error: 'The AI model is still loading. Please try again in a few seconds.' },
            { status: 503 }
          );
        }
        
        throw new Error(`Embedding API error: ${errorText}`);
      }

      const similarities = await embeddingResponse.json() as number[];
      
      if (!Array.isArray(similarities) || similarities.length !== chunks.length) {
        throw new Error('Invalid similarity scores returned from the model');
      }

      // Get top chunks with better similarity threshold
      const topIndices = similarities
        .map((score, idx): ChunkScore => ({ score, idx }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5) // Increase to top 5 chunks for better context
        .filter(item => item.score > 0.2) // Lower threshold to catch more relevant content
        .map(item => item.idx);
      
      if (topIndices.length === 0) {
        return NextResponse.json({
          response: "I couldn't find any relevant information in the document to answer your question. Please try rephrasing your question or ask about something else.",
          confidence: 0.01,
          citations: [],
        });
      }

      // Prepare context with better structure
      const context = `The following is a resume for Luke Payne. Please provide detailed answers about his experience, skills, and background based on this information:\n\n` +
        topIndices
          .map(idx => {
            const chunk = chunks[idx].text;
            // Clean up the text by removing extra whitespace and normalizing newlines
            const cleanedText = chunk
              .replace(/\s+/g, ' ')
              .replace(/\n+/g, '\n')
              .trim();
            return cleanedText;
          })
          .join('\n\n');

      // Enhanced prompt for better answer generation
      const enhancedQuestion = `Based on the resume information provided, ${message.toLowerCase()}. Please provide a complete and detailed answer using only the information given in the resume. If the information is not found in the resume, say so.`;

      // Call Hugging Face Inference API for question answering
      const qaResponse = await fetchWithRetry(
        'https://api-inference.huggingface.co/models/google/flan-t5-large',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`
          },
          body: JSON.stringify({
            inputs: `Answer this question about the resume: ${enhancedQuestion}\n\nResume Content:\n${context}`,
            parameters: {
              temperature: 0.1, // Very low temperature for factual answers
              max_length: 500, // Allow longer responses
              min_length: 50, // Ensure somewhat detailed responses
              num_return_sequences: 1,
              do_sample: false // Disable sampling for more deterministic responses
            }
          })
        },
        7,
        3000
      );

      if (!qaResponse.ok) {
        const errorText = await qaResponse.text();
        console.error('QA API error:', errorText);
        
        if (qaResponse.status === 503) {
          return NextResponse.json(
            { error: 'The AI model is still warming up. Please try again in a few moments.' },
            { status: 503 }
          );
        }
        
        throw new Error(`QA API error: ${errorText}`);
      }

      const generatedText = await qaResponse.json();
      
      if (!generatedText || typeof generatedText[0].generated_text !== 'string') {
        throw new Error('Invalid response from QA model');
      }

      // Post-process the answer
      let processedAnswer = generatedText[0].generated_text.trim();
      
      // Only include high-confidence citations
      const citationsWithHighConfidence = topIndices
        .map(idx => ({
          text: chunks[idx].text
            .replace(/\s+/g, ' ')
            .substring(0, 150) + '...',
          similarity: similarities[idx],
        }))
        .filter(citation => citation.similarity > 0.3);

      // Calculate overall confidence based on citation relevance and answer length
      const avgCitationScore = citationsWithHighConfidence.reduce((acc, curr) => acc + curr.similarity, 0) / 
                             (citationsWithHighConfidence.length || 1);
      const answerLengthScore = Math.min(processedAnswer.length / 100, 1); // Normalize to 0-1
      const overallConfidence = (avgCitationScore + answerLengthScore) / 2;

      return NextResponse.json({
        response: processedAnswer,
        confidence: overallConfidence,
        citations: citationsWithHighConfidence,
      });
    } catch (modelError) {
      console.error('Model error:', modelError);
      return NextResponse.json(
        { 
          error: modelError instanceof Error 
            ? modelError.message 
            : 'An unexpected error occurred while processing your request'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to process request: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
} 