import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Project data - in a real app, this would come from a database or CMS
const projects = [
  {
    id: 'llm-chatbot',
    title: 'LLM Chatbot MVP',
    description: 'A sophisticated chatbot built with GPT-4 and LangChain that can answer questions about documents with proper citation and reasoning.',
    longDescription: `
      This project demonstrates how to build a production-ready chatbot that can process documents and answer questions
      about them with accurate citations. I built this to showcase the capabilities of Large Language Models (LLMs)
      when combined with vector databases for efficient document retrieval.
      
      Key features include:
      • Document processing and chunking for optimal retrieval
      • Vector embeddings for semantic search
      • Custom prompting with context augmentation
      • Citation tracking and verification
      • Streaming responses for better UX
    `,
    tags: ['OpenAI', 'LangChain', 'React', 'Vector DB', 'TypeScript'],
    image: '/placeholder.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'yolo-object-detection',
    title: 'YOLOv5 Object Detection',
    description: 'A lightweight object detection system using YOLOv5 that can identify objects in real-time with high accuracy.',
    longDescription: `
      This project implements the YOLOv5 algorithm for real-time object detection with a custom-trained model
      for specific use cases. The system can process video streams or images and identify objects with bounding
      boxes and confidence scores.
      
      Technical highlights:
      • Model fine-tuning on custom dataset
      • Optimization for edge devices
      • Integration with web cameras and video streams
      • Performance benchmarking and comparison
      • Export to various deployment targets (ONNX, TensorRT)
    `,
    tags: ['PyTorch', 'YOLOv5', 'Computer Vision', 'Python', 'CUDA'],
    image: '/placeholder.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'langchain-doc-qa',
    title: 'LangChain Document Q&A',
    description: 'A web app that allows users to upload documents and ask questions about them, powered by LangChain and OpenAI.',
    longDescription: `
      This application allows users to upload documents (PDF, DOCX, TXT) and ask questions about their content. The system
      processes the documents, creates embeddings, and stores them in a vector database for efficient retrieval during
      question answering.
      
      Architecture and implementation:
      • Next.js frontend with server components
      • Document processing pipeline with LangChain
      • Vector storage with Pinecone
      • Streaming responses for better user experience
      • Custom prompt templates for improved accuracy
    `,
    tags: ['LangChain', 'Next.js', 'Vector DB', 'OpenAI', 'TypeScript'],
    image: '/placeholder.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: true
  },
  {
    id: 'ml-analytics-dashboard',
    title: 'ML Analytics Dashboard',
    description: 'A dashboard for visualizing machine learning model outputs and tutoring analytics, built with React and Node.js.',
    longDescription: `
      This dashboard provides a comprehensive view of machine learning model performance and analytics data. It was
      built to help track model metrics, visualize predictions, and monitor system performance in real-time.
      
      Key components:
      • Real-time data visualization with D3.js and Chart.js
      • Backend API with Node.js for data aggregation
      • User authentication and role-based access control
      • Exportable reports and insights
      • Customizable dashboard layouts
    `,
    tags: ['React', 'Node.js', 'D3.js', 'Data Viz', 'TypeScript'],
    image: '/placeholder.jpg',
    demoUrl: '#',
    githubUrl: '#',
    featured: true
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Projects</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl">
              A showcase of my work in AI, machine learning, and full-stack development. Each project represents
              a unique challenge and solution in the world of software engineering.
            </p>
            
            <div className="space-y-20">
              {projects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="h-64 md:h-auto relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 flex items-center justify-center">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white">{project.title}</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col">
                      <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mb-6 text-slate-600 dark:text-slate-400 space-y-4 max-h-[200px] overflow-y-auto">
                        {project.longDescription.trim().split('\n').map((paragraph, idx) => (
                          <p key={idx} className="text-sm">{paragraph.trim()}</p>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                        <a 
                          href={project.demoUrl} 
                          className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 font-medium transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                        <a 
                          href={project.githubUrl} 
                          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 font-medium transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 