import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CosmicBackground from "@/components/CosmicBackground";
import CustomCursor from "@/components/CustomCursor";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://yuuunivers.vercel.app"),
  title: {
    default: "Yuu | Senior Full Stack Web Developer & AI Engineer Aspirant",
    template: "%s | YuuUnivers",
  },
  description:
    "Explore the digital universe of Yuu — Senior Full Stack Web Developer with 4+ years of deep immersion across Next.js 16, TypeScript, PHP Laravel, 3D Spatial Glassmorphism UI, and AI Systems Architecture.",
  keywords: [
    "Yuu",
    "Bayu Anggara",
    "Senior Full Stack Web Developer",
    "AI Engineer",
    "Next.js 16",
    "TypeScript",
    "Tailwind CSS v4",
    "PHP Laravel",
    "3D Spatial Glassmorphism",
    "Firebase Firestore CMS",
    "UNIBI Teknik Informatika",
    "Yota Adiwidya Center",
    "Remote Web Developer",
  ],
  authors: [{ name: "Yuu (Bayu Anggara)", url: "https://github.com/Arterouss" }],
  creator: "Yuu (Bayu Anggara)",
  publisher: "YuuUnivers",
  openGraph: {
    title: "Yuu | Senior Full Stack Web Developer & AI Engineer Aspirant",
    description:
      "Crafting digital dimensions where art meets engineering. Explore 3D spatial case studies, interactive technical bento grid, and high-velocity web architecture.",
    url: "https://yuuunivers.vercel.app",
    siteName: "YuuUnivers Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuu | Senior Full Stack Web Developer & AI Engineer Aspirant",
    description:
      "Explore high-velocity Next.js 16 spatial glassmorphism apps, Laravel backend architectures, and AI systems by Yuu.",
    creator: "@yuuunivers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <CustomCursor />
          <CosmicBackground />
          <Navbar />
          <main className="flex-grow pt-24 pb-20">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
