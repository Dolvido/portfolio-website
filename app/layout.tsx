import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luke Payne - Software Engineer',
  description: 'Portfolio website for Luke Payne, software engineer focused on AI and full-stack systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
