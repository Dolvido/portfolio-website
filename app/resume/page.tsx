import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Resume() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 md:mb-0">Resume</h1>
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 font-medium transition-colors gap-2 self-start"
              download
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </a>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* Experience Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-slate-200 dark:border-slate-700">
                Professional Experience
              </h2>
              
              {/* Job 1 */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:justify-between mb-3">
                  <h3 className="text-xl font-bold">AI Engineer (Freelance)</h3>
                  <span className="text-slate-600 dark:text-slate-400 font-medium mt-1 md:mt-0">2023 - Present</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">Self-employed</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Developed LLM chatbot MVP for document Q&A with proper citation and reasoning</li>
                  <li>Built vector database integration for efficient document retrieval</li>
                  <li>Implemented custom prompting strategies to improve response quality</li>
                  <li>Optimized models for production deployment to reduce latency and costs</li>
                </ul>
              </div>
              
              {/* Job 2 */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:justify-between mb-3">
                  <h3 className="text-xl font-bold">Software Engineer</h3>
                  <span className="text-slate-600 dark:text-slate-400 font-medium mt-1 md:mt-0">2022 - 2023</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">Verint Systems</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Developed and maintained web applications using TypeScript, Node.js, and React</li>
                  <li>Contributed to backend services in a microservices architecture</li>
                  <li>Collaborated with teams across multiple time zones to deliver features</li>
                  <li>Participated in code reviews and technical design discussions</li>
                </ul>
              </div>
              
              {/* Job 3 */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row md:justify-between mb-3">
                  <h3 className="text-xl font-bold">Software Developer</h3>
                  <span className="text-slate-600 dark:text-slate-400 font-medium mt-1 md:mt-0">2020 - 2022</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">Peraton / Northrop Grumman</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Built simulation software using C++ for defense applications</li>
                  <li>Implemented machine learning models for computer vision using TensorFlow and YOLOv5</li>
                  <li>Optimized algorithms for performance in resource-constrained environments</li>
                  <li>Collaborated with cross-functional teams to meet project requirements</li>
                </ul>
              </div>
              
              {/* Job 4 */}
              <div>
                <div className="flex flex-col md:flex-row md:justify-between mb-3">
                  <h3 className="text-xl font-bold">Computer Science Tutor</h3>
                  <span className="text-slate-600 dark:text-slate-400 font-medium mt-1 md:mt-0">2018 - 2020</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-4 font-medium">University Name</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Tutored undergraduate students in data structures, algorithms, and programming concepts</li>
                  <li>Developed supplementary learning materials and practice problems</li>
                  <li>Provided one-on-one assistance during lab sessions</li>
                </ul>
              </div>
            </section>
            
            {/* Education Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-slate-200 dark:border-slate-700">
                Education
              </h2>
              <div>
                <div className="flex flex-col md:flex-row md:justify-between mb-3">
                  <h3 className="text-xl font-bold">B.S. Computer Science</h3>
                  <span className="text-slate-600 dark:text-slate-400 font-medium mt-1 md:mt-0">2016 - 2020</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">University Name</p>
              </div>
            </section>
            
            {/* Skills Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-slate-200 dark:border-slate-700">
                Technical Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Languages & Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {['TypeScript', 'JavaScript', 'Python', 'C++', 'React', 'Node.js', 'Next.js', 'TensorFlow', 'PyTorch'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">AI & ML</h3>
                  <div className="flex flex-wrap gap-2">
                    {['GPT-3.5/4', 'LangChain', 'Vector Databases', 'Embeddings', 'YOLOv5', 'Computer Vision', 'NLP'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Tools & Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'GitHub', 'Docker', 'AWS', 'Firebase', 'CI/CD', 'Agile/Scrum', 'Jira'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Other Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Technical Writing', 'UI/UX Design', 'Database Design', 'System Architecture', 'API Development', 'RESTful Services'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 rounded-full text-sm shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Certifications Section */}
            <section>
              <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-slate-200 dark:border-slate-700">
                Certifications
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold mb-2 text-slate-900 dark:text-white">AWS Certified Developer</h3>
                  <p className="text-slate-600 dark:text-slate-400">Amazon Web Services, 2023</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold mb-2 text-slate-900 dark:text-white">TensorFlow Developer Certificate</h3>
                  <p className="text-slate-600 dark:text-slate-400">Google, 2022</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold mb-2 text-slate-900 dark:text-white">LangChain for LLM Application Development</h3>
                  <p className="text-slate-600 dark:text-slate-400">DeepLearning.AI, 2023</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold mb-2 text-slate-900 dark:text-white">I&apos;m Currently Learning</h3>
                  <p className="text-slate-600 dark:text-slate-400">GraphQL, AWS Lambda</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 