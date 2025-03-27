import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function LLMChatbotProject() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      
      <main className="py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <Link 
              href="/projects"
              className="inline-flex items-center text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8"
            >
              ← Back to Projects
            </Link>

            <h1 className="text-4xl font-bold mb-4">LLM Chatbot MVP</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              A sophisticated chatbot built with Ollama and LangChain that can answer questions about documents with proper citation and reasoning.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {['Ollama', 'LangChain', 'React', 'Vector DB', 'TypeScript'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose dark:prose-invert max-w-none mb-12">
              <h2>Overview</h2>
              <p>
                This project demonstrates how to build a production-ready chatbot that can process documents and answer questions
                about them with accurate citations. Built using Ollama for local LLM inference, this chatbot showcases how to
                combine open-source LLMs with vector databases for efficient document retrieval.
              </p>

              <h2>Key Features</h2>
              <ul>
                <li>Local LLM inference using Ollama</li>
                <li>Document processing and chunking for optimal retrieval</li>
                <li>Vector embeddings for semantic search</li>
                <li>Custom prompting with context augmentation</li>
                <li>Citation tracking and verification</li>
                <li>Streaming responses for better UX</li>
              </ul>

              <h2>Technical Implementation</h2>
              <p>
                The chatbot is built using a modern tech stack that includes:
              </p>
              <ul>
                <li>Next.js for the frontend and API routes</li>
                <li>Ollama for local LLM inference (using models like Llama 2 or Mistral)</li>
                <li>LangChain for document processing and LLM integration</li>
                <li>Vector database for efficient document retrieval</li>
                <li>TypeScript for type safety and better developer experience</li>
                <li>Tailwind CSS for styling</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link
                href="/projects/llm-chatbot/demo"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium"
              >
                Try the Demo
              </Link>
              <a
                href="#"
                className="px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 