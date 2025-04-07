'use client';

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Link from "next/link";
import ProfileImage from "./components/ProfileImage";
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Brain, BarChart3, Code } from 'lucide-react';
import ProjectCard from "./components/ProjectCard";

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
            <div className="grid md:grid-cols-3 gap-6">
              <ProjectCard
                category="AI / ML"
                title="Document Q&A Chatbot"
                description="AI-powered document analysis tool for intelligent question answering. Upload documents and get instant, context-aware responses."
                tags={['Next.js', 'AI', 'LangChain', 'TypeScript']}
                href="https://document-qa-lukepayne.vercel.app/"
                icon={<Brain className="w-8 h-8 text-blue-400" />}
              />
              
              <ProjectCard
                category="AI / ML"
                title="Smart Image Insights"
                description="Computer vision app that automatically labels photos with detailed object detection and scene analysis."
                tags={['Next.js', 'Computer Vision', 'yolov5']}
                href="https://smart-image-insights.vercel.app"
                icon={<Brain className="w-8 h-8 text-purple-400" />}
              />

              <ProjectCard
                category="Developer Tools"
                title="AutoCritic"
                description="Privacy-focused AI tool for code review and analysis that runs 100% locally using Ollama."
                tags={['Python', 'LangChain', 'Local LLMs']}
                href="/blog/autocritic"
                icon={<Code className="w-8 h-8 text-green-400" />}
              />
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Skills & Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">AI & ML</h4>
                <p className="text-slate-600 dark:text-slate-400">PyTorch, TensorFlow, Scikit-learn, LLMs, RAG, Embeddings, Vector Databases</p>
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
