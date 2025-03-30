import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main>
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Get In Touch</h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 text-center">
                I&apos;m currently available for freelance work and full-time positions. 
                If you have a project that needs some creative engineering or if you&apos;re 
                looking to hire, I&apos;d love to hear from you!
              </p>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-md">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold mb-3">Email</h3>
                      <a 
                        href="mailto:youremail@example.com" 
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        youremail@example.com
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3">Follow Me</h3>
                      <div className="space-y-3">
                        <a 
                          href="https://github.com/dolvido" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          GitHub
                        </a>
                        <a 
                          href="https://linkedin.com/in/lukepaynesci"
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                          LinkedIn
                        </a>
                        <a 
                          href="https://twitter.com/dolvido1" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                          </svg>
                          Twitter
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-3">Location</h3>
                      <p className="text-slate-600 dark:text-slate-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Remote / Available Worldwide
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-md">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block mb-2 font-medium">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                                    bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block mb-2 font-medium">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                                    bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                                  bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-2 font-medium">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                                  bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 font-medium">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md 
                                  bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-slate-900 text-white rounded-md hover:bg-slate-800 font-medium transition-colors"
                    >
                      Send Message
                    </button>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      * Required fields
                    </p>
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