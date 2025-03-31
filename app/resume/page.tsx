import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Resume() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />

      <main className="py-12 md:py-16">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Luke Payne</h1>
              <div className="text-slate-400 space-y-1">
                <p>Virginia</p>
                <p>(540) 322-6547</p>
                <p>lukecello@gmail.com</p>
                <p className="flex gap-2">
                  <a href="https://www.linkedin.com/in/lukepaynesci/" className="hover:underline">LinkedIn</a> | 
                  <a href="https://github.com/Dolvido" className="hover:underline">GitHub</a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Professional Summary */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-700">
              Professional Summary
            </h2>
            <p className="text-slate-400">
              Dynamic and adaptable Software Engineer with years of experience in developing and
              maintaining software solutions. Proficient in Python, C++, and TypeScript, with a
              strong focus on algorithmic thinking and problem-solving. Experienced in designing and
              implementing machine-learning and AI-driven systems while providing high-quality
              support and training.
            </p>
          </section>
          
          {/* Experience Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-slate-700">
              Professional Experience
            </h2>
            
            {/* Job 1 */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">Freelance Software Developer — Generative AI & Chatbot Development</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">September 2023 – Present</span>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Developed chatbot solutions in MVP utilizing large language models (LLMs) including GPT-3.5/4, Claude, and the Ollama family to automate interactions.</li>
                <li>Integrated the Langchain framework in Python for prompt engineering, embedding workflows, and vector databases (Chroma, FAISS) to build scalable AI-driven applications.</li>
              </ul>
            </div>
            
            {/* Job 2 */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">Academic Tutor (Computer Science), Online</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">May 2022 – Present</span>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Provided one-on-one tutoring in algorithms, data structures, machine learning, and cybersecurity.</li>
                <li>Created tailored coding exercises, quizzes, and lesson plans.</li>
                <li>Assisted students in debugging complex assignments, leading to measurable academic improvement.</li>
                <li>Utilized remote collaboration tools (Zoom, GitHub) for effective teaching.</li>
              </ul>
            </div>
            
            {/* Job 3 */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">Verint - Software Engineer</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">Dec 2023 – Nov 2024</span>
              </div>
              <p className="text-slate-300 mb-4 font-medium">Remote</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Engineered scalable B2B SaaS web applications using TypeScript and Node.js, ensuring reliability and performance.</li>
                <li>Diagnosed and resolved software bugs while writing enhancements. Participated in code review.</li>
              </ul>
            </div>
            
            {/* Job 4 */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">Naval Surface Warfare Center Dahlgren — Computer Scientist</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">June 2021 – May 2022</span>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Developed Python-based data pipelines for training TensorFlow and YOLOv5 models.</li>
                <li>Collaborated closely with data scientists to address complex data engineering challenges with AI.</li>
                <li>Delivered high-quality, research grade software to support ML-driven projects.</li>
              </ul>
            </div>
            
            {/* Job 5 */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">Peraton — Software Engineer</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">June 2020 – June 2021</span>
              </div>
              <p className="text-slate-300 mb-4 font-medium">Dahlgren, VA</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Conducted software maintenance and development in C++.</li>
                <li>Investigated and resolved software problem reports.</li>
                <li>Facilitated user training sessions and integration testing for simulation software.</li>
                <li>Managed version control and deployment in production and test environments.</li>
              </ul>
            </div>
            
            {/* Job 6 */}
            <div>
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">Northrop Grumman — Software Engineer</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">May 2018 – June 2020</span>
              </div>
              <p className="text-slate-300 mb-4 font-medium">Dahlgren, VA</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-400">
                <li>Designed and implemented Python-driven ML data processing systems.</li>
                <li>Independently developed data-processing tools based on client requirements.</li>
                <li>Maintained extensive codebases for U.S. Navy simulation software.</li>
                <li>Led troubleshooting efforts, presented findings, and integrated solutions.</li>
              </ul>
            </div>
          </section>
          
          {/* Education Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-slate-700">
              Education
            </h2>
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">B.S. Computer Science</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">2014 – 2018</span>
              </div>
              <p className="text-slate-300 font-medium">University of Mary Washington, Fredericksburg, VA</p>
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:justify-between mb-3">
                <h3 className="text-xl font-bold">B.A. Music</h3>
                <span className="text-slate-400 font-medium mt-1 md:mt-0">2014 – 2018</span>
              </div>
              <p className="text-slate-300 font-medium">University of Mary Washington, Fredericksburg, VA</p>
            </div>
          </section>
          
          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-slate-700">
              Technical Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">Generative AI & LLMs</h3>
                <div className="flex flex-wrap gap-2">
                  {['GPT-3.5/4', 'Claude', 'Gemini', 'LangChain', 'LangGraph', 'Agentic AI', 'Prompt Engineering', 'Vector Databases'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-slate-700 rounded-full text-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">Languages & Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'React.js', 'Next.js', 'C++', 'TypeScript', 'TensorFlow', 'YOLOv5'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-slate-700 rounded-full text-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">Web & Database</h3>
                <div className="flex flex-wrap gap-2">
                  {['Web Development', 'Backend Development', 'Database Management', 'RESTful APIs'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-slate-700 rounded-full text-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">Cloud & Version Control</h3>
                <div className="flex flex-wrap gap-2">
                  {['OpenAI API', 'Cloud-based Deployments', 'Git', 'GitHub'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-slate-700 rounded-full text-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 