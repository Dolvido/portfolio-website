'use client';

import { useState, useRef, useEffect } from 'react';
import DocumentUpload from '../../../components/DocumentUpload';
import ChatMessage from '../../../components/ChatMessage';

interface Message {
  text: string;
  isUser: boolean;
  citations?: Array<{
    text: string;
    similarity: number;
  }>;
  confidence?: number;
}

interface UploadedFile {
  name: string;
  id: string;
  timestamp: Date;
}

export default function ChatbotDemo() {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDocumentProcessed = (id: string, fileName: string) => {
    setDocumentId(id);
    setUploadedFiles(prev => [...prev, {
      id,
      name: fileName,
      timestamp: new Date()
    }]);
  };

  const handleDocumentSelect = (id: string) => {
    setDocumentId(id);
    // Clear messages when switching documents
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !documentId) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);
    setModelLoading(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          documentId,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 503) {
          setModelLoading(true);
          throw new Error('The AI model is still loading. Please try again in a few seconds.');
        }
        throw new Error(data.error || 'Failed to get response');
      }

      setMessages(prev => [
        ...prev,
        {
          text: data.response,
          isUser: false,
          citations: data.citations,
          confidence: data.confidence,
        },
      ]);
    } catch (err: unknown) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          text: err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Document Q&A Chatbot
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Upload a document and ask questions about its contents. The chatbot will provide answers based on the document's content.
        </p>

        <div className="grid gap-6 mb-8">
          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <DocumentUpload onDocumentProcessed={handleDocumentProcessed} />
          </div>

          {/* Uploaded Files Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Uploaded Documents</h2>
            {uploadedFiles.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No documents uploaded yet
              </p>
            ) : (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div 
                    key={file.id}
                    onClick={() => handleDocumentSelect(file.id)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 cursor-pointer
                      ${documentId === file.id 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800' 
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors duration-200
                        ${documentId === file.id
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                        <svg 
                          className={`w-5 h-5 transition-colors duration-200
                            ${documentId === file.id
                              ? 'text-blue-600 dark:text-blue-300'
                              : 'text-gray-600 dark:text-gray-300'
                            }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                          />
                        </svg>
                      </div>
                      <div>
                        <p className={`text-sm font-medium transition-colors duration-200
                          ${documentId === file.id
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-gray-900 dark:text-white'
                          }`}>
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {file.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {documentId === file.id && (
                      <span className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Section */}
          {documentId ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="h-[400px] overflow-y-auto mb-4">
                {messages.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center my-8">
                    Ask a question about your document!
                  </p>
                ) : (
                  messages.map((msg, idx) => (
                    <ChatMessage
                      key={idx}
                      message={msg.text}
                      isUser={msg.isUser}
                      citations={msg.citations}
                      confidence={msg.confidence}
                    />
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-center items-center py-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                      {modelLoading && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          AI model is loading, this might take a few seconds...
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Please upload a document to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 