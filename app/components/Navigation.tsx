"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
const items = [['/projects', 'The work'], ['/lab', 'Writing'], ['/about', 'About'], ['/resume', 'Resume'], ['/contact', 'Contact']];
export default function Navigation() { const pathname = usePathname(); return <><a href="#main-content" className="skip-link">Skip to content</a><header className="site-header container"><nav aria-label="Main navigation"><Link href="/" className="wordmark">Luke Payne</Link><div className="site-nav-links">{items.map(([href, label]) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}>{label}</Link>)}</div><ThemeToggle /></nav></header></>; }
