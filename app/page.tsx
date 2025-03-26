import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Link from "next/link";
import ProfileImage from "./components/ProfileImage";

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark-300">
      <Navigation />

      <main className="w-full mx-auto">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-96 bg-primary/10 blur-[120px] rounded-full -z-10"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 blur-[120px] rounded-full -z-10"></div>

          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
              <div className="md:w-1/2 space-y-8 animate-fade-in max-w-xl">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground text-sm font-medium">
                  Software Engineering & AI
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="gradient-text">Software Engineer</span>
                </h1>
                <h2 className="text-xl md:text-2xl text-text-secondary dark:text-text-secondary-dark">
                  Specializing in AI, ML, and Full-Stack Development
                </h2>
                <p className="text-lg text-text-tertiary dark:text-text-tertiary-dark max-w-md">
                  Building innovative solutions at the intersection of code and creativity.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="#projects" className="px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 shadow-md transition-all">View Projects</a>
                  <a href="#contact" className="px-6 py-3 border border-border-light dark:border-border-dark rounded-lg bg-white/50 dark:bg-surface-dark-100/50 backdrop-blur-sm hover:bg-white dark:hover:bg-surface-dark-100 shadow-sm transition-all">Contact Me</a>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <ProfileImage />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-24 bg-surface-100 dark:bg-surface-dark-200">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary-foreground text-sm font-medium mb-3">
                About Me
              </div>
              <h2 className="text-3xl font-bold gradient-text">The Story So Far</h2>
            </div>
            
            <div className="max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.1s'}}>
              <p className="text-lg mb-6 text-text-secondary dark:text-text-secondary-dark">
                I&apos;m Luke, a Software Engineer who blends ML, AI, and full-stack development to build meaningful solutions. 
                Whether it&apos;s designing scalable web apps or debugging deep learning models, I thrive at the intersection of code and creativity.
              </p>
              <p className="text-lg mb-10 text-text-secondary dark:text-text-secondary-dark">
                My experience spans freelance innovation with AI/LLM work, corporate and defense sector experience
                (Verint, Peraton, Northrop Grumman), and academic support through CS tutoring.
              </p>
              
              <div className="bg-surface-100/50 dark:bg-surface-dark-200/50 rounded-lg p-8 mb-8">
                <h2 className="text-xl font-semibold mb-6 text-text-secondary dark:text-text-secondary-dark text-center">
                  Skills & Expertise
                </h2>
                <div className="flex flex-wrap justify-center items-center">
                  {[
                    'TypeScript',
                    'React',
                    'Node.js',
                    'Next.js',
                    'Python',
                    'TensorFlow',
                    'GPT-3.5/4',
                    "Ollama",
                    'LangChain',
                    'Vector Databases',
                    'C++'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1 bg-white dark:bg-surface-dark-100 text-text-primary dark:text-text-primary-dark text-sm font-medium rounded-none border border-border-light dark:border-border-dark hover:bg-white/80 dark:hover:bg-surface-dark-100/80 transition-colors duration-200 flex items-center justify-center"
                    >
                      &nbsp;{skill}&nbsp;
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative py-24">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent-foreground text-sm font-medium mb-3">
                My Work
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-4">Featured Projects</h2>
              <p className="text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto">
                A collection of my recent work in AI chatbots, LLMs, and conversational interfaces.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto space-y-12">
              {/* Project 1 */}
              <div className="group relative bg-white dark:bg-surface-dark-100 rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-lg animate-fade-in hover:shadow-xl transition-all duration-300" style={{animationDelay: '0.1s'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-medium text-primary">AI / ML</span>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-text-primary dark:text-text-primary-dark">Local LLM Integration</h3>
                      <p className="text-text-secondary dark:text-text-secondary-dark mb-6 text-sm">
                        A high-performance chat interface built with Ollama, featuring local LLM integration for privacy-focused AI interactions and document analysis.
                      </p>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">Ollama</span>
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">LangChain</span>
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">React</span>
                      </div>
                    </div>
                    <Link 
                      href="/projects/local-llm"
                      className="inline-flex items-center text-primary dark:text-primary font-medium group/link text-sm"
                    >
                      <span className="relative">
                        View Project
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                  <div className="relative h-full min-h-[240px] bg-gradient-to-br from-primary to-secondary">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="p-6 text-center">
                        <span className="text-3xl font-bold mb-4 block">Local AI</span>
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">Ollama</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">LangChain</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">React</span>
                        </div>
                        <div className="w-14 h-14 mx-auto rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative bg-white dark:bg-surface-dark-100 rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-lg animate-fade-in hover:shadow-xl transition-all duration-300" style={{animationDelay: '0.2s'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="order-2 md:order-1 relative h-full min-h-[240px] bg-gradient-to-br from-secondary to-accent">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="p-6 text-center">
                        <span className="text-3xl font-bold mb-3 block">Vision AI</span>
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">PyTorch</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">YOLOv5</span>
                          <span className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">Computer Vision</span>
                        </div>
                        <div className="w-14 h-14 mx-auto rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-1 md:order-2 p-6 md:p-8 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-2 w-2 rounded-full bg-secondary"></div>
                        <span className="text-sm font-medium text-secondary">Computer Vision</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-text-primary dark:text-text-primary-dark">Real-time Object Detection</h3>
                      <p className="text-text-secondary dark:text-text-secondary-dark mb-4 text-sm">
                        A YOLOv5-based system that can detect and track objects in real-time video streams with high accuracy and low latency.
                      </p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">PyTorch</span>
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">YOLOv5</span>
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">Computer Vision</span>
                      </div>
                    </div>
                    <Link 
                      href="/projects/object-detection"
                      className="inline-flex items-center text-secondary dark:text-secondary font-medium group/link text-sm"
                    >
                      <span className="relative">
                        View Project
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative bg-white dark:bg-surface-dark-100 rounded-xl overflow-hidden border border-border-light dark:border-border-dark shadow-lg animate-fade-in hover:shadow-xl transition-all duration-300" style={{animationDelay: '0.3s'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-6 md:p-8 flex flex-col justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-2 w-2 rounded-full bg-accent"></div>
                        <span className="text-sm font-medium text-accent">Web Development</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-text-primary dark:text-text-primary-dark">Portfolio Website</h3>
                      <p className="text-text-secondary dark:text-text-secondary-dark mb-4 text-sm">
                        A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Firebase hosting.
                      </p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">Next.js</span>
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">Tailwind CSS</span>
                        <span className="px-4 py-2 bg-surface-100 dark:bg-surface-dark-200 text-text-primary dark:text-text-primary-dark text-xs rounded-full">Firebase</span>
                      </div>
                    </div>
                    <Link 
                      href="/projects/portfolio"
                      className="inline-flex items-center text-accent dark:text-accent font-medium group/link text-sm"
                    >
                      <span className="relative">
                        View Project
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                  <div className="relative h-full min-h-[240px] bg-gradient-to-br from-accent to-primary">
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="p-6 text-center">
                        <span className="text-3xl font-bold mb-3 block">Portfolio</span>
                        <div className="w-14 h-14 mx-auto rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-16 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Link 
                href="/projects" 
                className="group relative px-8 py-4 border border-border-light dark:border-border-dark rounded-xl bg-white/50 dark:bg-surface-dark-100/50 hover:bg-white dark:hover:bg-surface-dark-100 shadow-sm transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-text-primary dark:text-text-primary-dark font-medium">
                  View All Projects
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-24 bg-surface-100 dark:bg-surface-dark-200 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full -z-10"></div>
          
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground text-sm font-medium mb-3">
                Contact
              </div>
              <h2 className="text-3xl font-bold gradient-text">Get In Touch</h2>
              <p className="text-text-secondary dark:text-text-secondary-dark mt-4">
                I&apos;m currently open to new opportunities and collaborations. Feel free to reach out!
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-white dark:bg-surface-dark-100 p-8 rounded-xl shadow-md border border-border-light dark:border-border-dark animate-fade-in" style={{animationDelay: '0.1s'}}>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold mb-3 gradient-text">Email</h3>
                      <a href="mailto:youremail@example.com" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors">
                        youremail@example.com
                      </a>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3 gradient-text">Connect</h3>
                      <div className="flex gap-4">
                        <a href="https://github.com/yourusername" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors">
                          GitHub
                        </a>
                        <a href="https://linkedin.com/in/yourusername" className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3 gradient-text">Location</h3>
                      <p className="text-text-secondary dark:text-text-secondary-dark">
                        Remote / Available Worldwide
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-surface-dark-100 p-8 rounded-xl shadow-md border border-border-light dark:border-border-dark animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <form className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium text-text-primary dark:text-text-primary-dark">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-border-light dark:border-border-dark rounded-lg 
                                  bg-surface-100 dark:bg-surface-dark-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium text-text-primary dark:text-text-primary-dark">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-border-light dark:border-border-dark rounded-lg 
                                  bg-surface-100 dark:bg-surface-dark-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block mb-2 font-medium text-text-primary dark:text-text-primary-dark">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-border-light dark:border-border-dark rounded-lg 
                                  bg-surface-100 dark:bg-surface-dark-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="How can I help you?"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 shadow-md transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
