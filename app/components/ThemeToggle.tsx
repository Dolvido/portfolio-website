"use client";
import { useEffect, useState } from 'react';
export default function ThemeToggle() { const [theme, setTheme] = useState('paper'); useEffect(() => setTheme(document.documentElement.dataset.theme || 'paper'), []); function choose(value: string) { document.documentElement.dataset.theme = value; setTheme(value); try {
    localStorage.setItem('portfolio-theme', value);
}
catch { } } return <div className="palette" role="group" aria-label="Color theme">{['paper', 'ink'].map(value => <button key={value} type="button" aria-pressed={theme === value} onClick={() => choose(value)}>{value === 'paper' ? 'Paper' : 'Ink'}</button>)}</div>; }
