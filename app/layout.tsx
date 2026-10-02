import "./globals.css";
import "./studio.css";
import type { Metadata } from "next";

const portfolioDescription =
  "Software engineering, AI systems and applied ML experiments with inspectable evidence and clear boundaries.";
const portfolioSocialImage = "/images/headshot2026.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://lukepayne.web.app"),
  title: "Luke Payne - Software Engineer",
  description: "Luke Payne’s software engineering portfolio: system architecture, AI and applied ML, evaluation and inspectable experiments.",
  openGraph: {
    title: "Luke Payne - Software, AI & Applied ML",
    description: portfolioDescription,
    type: "website",
    siteName: "Luke Payne Portfolio",
    images: [
      {
        url: portfolioSocialImage,
        alt: "Luke Payne, AI and full-stack software engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luke Payne - Software, AI & Applied ML",
    description: portfolioDescription,
    images: [portfolioSocialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html: "try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='ink'?'ink':'paper'}catch{document.documentElement.dataset.theme='paper'}"}} /></head>
      <body>{children}</body>
    </html>
  );
}
