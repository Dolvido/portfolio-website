import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "./globals.css";

export const metadata: Metadata = {
  title: "Luke's Portfolio | Software Engineer",
  description: "Portfolio website showcasing software engineering projects in AI, ML, and web development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <body>{children}</body>
    </html>
  )
}
