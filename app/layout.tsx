import "./globals.css";
import type { Metadata } from "next";

const portfolioDescription =
  "Software engineering portfolio featuring AI systems, full-stack products, and technical case studies.";
const portfolioSocialImage = "/images/headshot2026.webp";

export const metadata: Metadata = {
  metadataBase: new URL("https://lukepayne.web.app"),
  title: "Luke Payne - Software Engineer",
  description: "Portfolio website for Luke Payne, software engineer focused on AI and full-stack systems.",
  openGraph: {
    title: "Luke Payne - AI / Full-Stack Software Engineer",
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
    title: "Luke Payne - AI / Full-Stack Software Engineer",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
