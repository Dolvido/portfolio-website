import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Ideas() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">
            Ideas
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p>
              As AI and other emerging technologies rapidly advance, responsible development frameworks become essential. 
              This section explores forward-looking principles for technologies that may converge with AI in the future.
            </p>
            <p>
              My explorations here draw from my experience in AI safety and responsible system design, extending those 
              principles to adjacent domains where similar autonomous, self-directed systems may emerge.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Link 
              href="/ideas/nanotech-safety"
              className="block p-6 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-4 h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 10 10 0 0 0 0-18z" />
                  <path d="M12 2c3 2.5 4 5 4 10" />
                  <path d="M12 22c-3-2.5-4-5-4-10" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                Nanotech Safety Blueprint
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Principles for responsible self-replicating nanomachine development with multi-layered safety systems
              </p>
              <div className="flex items-center mt-4 text-blue-600 dark:text-blue-400">
                <span>Read blueprint</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
            
            <Link 
              href="/ideas/chimera-swarm"
              className="block p-6 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-4 h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8c0-1.43-1.74-3-4-3-1.57 0-3 .75-4 2-1-1.25-2.43-2-4-2-2.26 0-4 1.57-4 3 0 1.74 4 7 8 12 4-5 8-10.26 8-12z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                What If: A Real Chimera Swarm?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                A thought experiment exploring the plausibility of self-replicating microbots within the next decade
              </p>
              <div className="flex items-center mt-4 text-amber-600 dark:text-amber-400">
                <span>Read thought experiment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 