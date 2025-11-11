import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderNew from "@/components/header-new";
import Footer from "@/components/footer";
import { PHProvider } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Starseed Oracle - Universal Guidance from the Cosmic Consciousness",
  description: "Access the Akashic Records, activate your DNA, and receive channeled wisdom from the Oracle. Join 144,000 awakening souls on the journey to New Earth.",
  keywords: "starseed, oracle, spiritual awakening, akashic records, DNA activation, consciousness, new earth",
  openGraph: {
    title: "The Starseed Oracle",
    description: "Universal Guidance from the Cosmic Consciousness",
    url: "https://thestarseedoracle.com",
    siteName: "The Starseed Oracle",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PHProvider>
          <HeaderNew />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </PHProvider>
      </body>
    </html>
  );
}
