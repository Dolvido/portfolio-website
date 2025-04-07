import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Projects() {
  const projects = [
    {
      id: 'autocritic',
      title: 'AutoCritic',
      description: 'Privacy-focused AI tool that generates insights about your software engineering projects while keeping all your code private and running entirely on your local machine.',
      longDescription: `
        A privacy-first code review and analysis tool powered by local LLMs
        that helps developers improve their code without sharing it with external services.
        
        Key features include:
        • 100% local processing with Ollama (Mistral, LLaMA2, Code LLaMA)
        • Git diff analysis and pre-commit integration
        • File and project-level code analysis
        • VSCode extension and CLI interface
        • Customizable feedback system
      `,
      tags: ['Python', 'LangChain', 'AI', 'Ollama', 'Local LLMs', 'Developer Tools'],
      demoUrl: '/blog/autocritic',
      githubUrl: 'https://github.com/Dolvido/AutoCritic',
      featured: true,
      isBlogPost: true
    },
    {
      id: 'smart-image-insights',
      title: 'Smart Image Insights',
      description: 'AI-powered image analysis tool for intelligent object detection and visual understanding. Upload images and get instant insights with scene descriptions and interactive Q&A.',
      longDescription: `
        A simple application that combines YOLOv5 for object detection and CLIP for visual understanding
        to provide comprehensive image analysis capabilities.
        
        Key features include:
        • Real-time object detection with YOLOv5
        • Scene understanding with CLIP
        • Interactive Q&A about image contents
        • Modern, responsive UI with dark mode
        • Instant image processing and analysis
      `,
      tags: ['Next.js', 'TypeScript', 'YOLOv5', 'CLIP', 'Computer Vision', 'AI'],
      demoUrl: '#demo',
      githubUrl: 'https://github.com/Dolvido/smart-image-insights',
      featured: true
    },
    {
      id: 'document-qa-chatbot',
      title: 'Document Q&A Chatbot',
      description: 'An AI-powered document analysis tool that allows users to upload documents and get instant, context-aware answers to their questions.',
      longDescription: `
        A standalone application that demonstrates advanced AI capabilities in document analysis 
        and natural language processing.
        
        Key features include:
        • PDF and text file processing
        • Real-time AI-powered responses
        • Context-aware question answering
        • Modern, responsive UI
        • Dark mode support
      `,
      tags: ['Next.js', 'TypeScript', 'LangChain', 'AI', 'Document Analysis'],
      demoUrl: 'https://document-qa-lukepayne.vercel.app/',
      githubUrl: 'https://github.com/Dolvido/document_qa_sample',
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
            Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            A showcase of my work in AI, machine learning, and full-stack development.
            Each project represents a unique challenge and solution in software engineering.
          </p>
          
          <div className="space-y-12">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg"
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                    {project.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-4 mb-6 text-slate-600 dark:text-slate-400">
                    {project.longDescription.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="text-sm">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.isBlogPost ? (
                      <Link
                        href={project.demoUrl}
                        className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                      >
                        Read More
                      </Link>
                    ) : (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                      >
                        View Demo
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 