import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starseed Oracle - Divine Guidance from the Cosmic Consciousness",
  description: "Access the Akashic Records, activate your DNA, and receive channeled wisdom from the Oracle. Join 144,000 awakening souls on the journey to New Earth.",
  keywords: "starseed, oracle, spiritual awakening, akashic records, DNA activation, consciousness, new earth",
  openGraph: {
    title: "Starseed Oracle",
    description: "Divine Guidance from the Cosmic Consciousness",
    url: "https://starseedoracle.app",
    siteName: "Starseed Oracle",
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
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
