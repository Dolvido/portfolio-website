'use client';

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Link from "next/link";
import ProfileImage from "./components/ProfileImage";
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with proper bottom margin */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-32">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 text-white">
                Luke Payne
              </h1>
              <h2 className="text-2xl text-slate-400 mb-6">
                Software Engineer
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                I build intelligent software solutions with a focus on AI, machine learning,
                and full-stack development. Currently working on next-generation AI applications
                and developer tools.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </div>
            
            {/* Profile Image with proper sizing */}
            <div className="w-80 h-80 flex-shrink-0">
              <ProfileImage />
            </div>
          </div>

          {/* Featured Projects Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-white">
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                      ML Analytics Dashboard
                    </h4>
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                      Featured
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Real-time analytics dashboard for machine learning model performance monitoring.
                    Track metrics, visualize predictions, and optimize your ML models.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'TypeScript', 'D3.js', 'ML'].map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link 
                      href="/projects"
                      className="flex items-center gap-2 text-sm px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors group"
                    >
                      Learn More
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Document Q&A Chatbot
                    </h4>
                    <span className="px-3 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                      New
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    AI-powered document analysis tool for intelligent question answering.
                    Upload documents and get instant, context-aware responses.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Next.js', 'AI', 'LangChain', 'TypeScript'].map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs bg-slate-200/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <motion.a 
                      href="https://document-qa-lukepayne.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors group"
                      whileHover={{ gap: '12px' }}
                    >
                      View Demo
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                    <motion.a 
                      href="https://github.com/Dolvido/document_qa_sample"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                      whileHover={{ gap: '12px' }}
                    >
                      Code
                      <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Skills & Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">AI & ML</h4>
                <p className="text-slate-600 dark:text-slate-400">PyTorch, TensorFlow, Scikit-learn</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">Frontend</h4>
                <p className="text-slate-600 dark:text-slate-400">React, Next.js, TypeScript</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">Backend</h4>
                <p className="text-slate-600 dark:text-slate-400">Node.js, Python, FastAPI</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
