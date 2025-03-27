'use client';

import React, { useState } from 'react';

interface DocumentUploadProps {
  onDocumentProcessed?: (documentId: string, fileName: string) => void;
}

interface ProcessDocumentResponse {
  documentId: string;
  chunks: number;
  error?: string;
}

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function DocumentUpload({ onDocumentProcessed }: DocumentUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document using the browser's built-in PDF.js
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Get text content from all pages
      const maxPages = pdf.numPages;
      const textContent: string[] = [];
      
      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: { str: string }) => item.str)
          .join(' ');
        textContent.push(pageText);
      }
      
      return textContent.join('\n\n');
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // Create form data
      const formData = new FormData();
      
      // If it's a PDF, extract text first
      if (file.type === 'application/pdf') {
        // Load PDF.js if not already loaded
        if (!window.pdfjsLib) {
          const pdfjsScript = document.createElement('script');
          pdfjsScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          await new Promise<void>((resolve, reject) => {
            pdfjsScript.onload = () => resolve();
            pdfjsScript.onerror = () => reject();
            document.head.appendChild(pdfjsScript);
          });
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }

        const text = await extractTextFromPDF(file);
        const textBlob = new Blob([text], { type: 'text/plain' });
        formData.append('file', textBlob, file.name.replace('.pdf', '.txt'));
      } else {
        formData.append('file', file);
      }

      // Upload file
      const response = await fetch('/api/process-document', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json() as ProcessDocumentResponse;

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process document');
      }

      setError(null);
      if (onDocumentProcessed) {
        onDocumentProcessed(result.documentId, file.name);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700">
      <div className="text-center">
        <input
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          disabled={isUploading}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
        >
          {isUploading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Processing...
            </>
          ) : (
            'Upload Document'
          )}
        </label>
        {error && (
          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Upload a PDF or text file to start chatting about it
        </p>
      </div>
    </div>
  );
} 