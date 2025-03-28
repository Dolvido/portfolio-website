import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Projects() {
  const projects = [
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
    },
    {
      id: 'yolo-object-detection',
      title: 'YOLOv5 Object Detection',
      description: 'A lightweight object detection system using YOLOv5 that can identify objects in real-time with high accuracy.',
      longDescription: `
        This project implements the YOLOv5 algorithm for real-time object detection with a custom-trained model
        for specific use cases. The system can process video streams or images and identify objects with bounding
        boxes and confidence scores.
      `,
      tags: ['PyTorch', 'YOLOv5', 'Computer Vision', 'Python', 'CUDA'],
      demoUrl: '/projects/yolo-demo',
      githubUrl: '#',
      featured: true
    },
    {
      id: 'ml-analytics-dashboard',
      title: 'ML Analytics Dashboard',
      description: 'A dashboard for visualizing machine learning model outputs and analytics.',
      longDescription: `
        This dashboard provides a comprehensive view of machine learning model performance and analytics data.
        Built to help track model metrics, visualize predictions, and monitor system performance in real-time.
      `,
      tags: ['React', 'Node.js', 'D3.js', 'Data Viz', 'TypeScript'],
      demoUrl: '/projects/analytics-demo',
      githubUrl: '#',
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
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                    >
                      View Demo
                    </a>
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