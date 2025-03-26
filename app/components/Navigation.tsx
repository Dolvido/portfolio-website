"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-surface-dark-200/80 subtle-blur-backdrop shadow-md' 
        : 'bg-transparent'
    }`}>
      <nav className="container flex items-center justify-between h-20 px-4 md:px-6">
        <Link href="/" className="font-bold text-xl tracking-tight gradient-text">Luke</Link>
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/#about" className="text-text-primary dark:text-text-primary-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">About</Link>
          <Link href="/projects" className="text-text-primary dark:text-text-primary-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">Projects</Link>
          <Link href="/contact" className="text-text-primary dark:text-text-primary-dark hover:text-primary dark:hover:text-primary transition-colors font-medium">Contact</Link>
          <Link href="/resume" className="px-5 py-2.5 gradient-bg text-white rounded-lg hover:opacity-90 font-medium shadow-md transition-all">Resume</Link>
        </div>
      </nav>
    </header>
  );
} 