import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function BlogIndex() {
  const blogPosts = [
    {
      id: 'autocritic',
      title: 'AutoCritic',
      description: 'A privacy-focused tool for generating insights about your software engineering projects',
      date: 'April 2023',
      tags: ['AI', 'Python', 'LangChain', 'Software Engineering', 'Ollama', 'Local LLMs'],
      slug: '/blog/autocritic'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
            Blog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            My thoughts, projects, and ideas on software engineering, AI, and technology.
          </p>
          
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id}
                href={post.slug}
                className="block bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    {post.date}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 