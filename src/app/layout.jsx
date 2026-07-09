import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Particle from "@/components/layout/Particle";
import AOSProvider from "@/components/layout/AOSProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import VisitNotifier from "@/components/layout/VisitNotifier";
import SplashScreen from "@/components/layout/SplashScreen";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn("h-full bg-white", "font-sans", geist.variable)}
    >
      <head>
        <title>Abdul Aziz De Borja | AbduldbDev</title>
        <meta
          name="description"
          content="Portfolio of Abdul Aziz De Borja, Full-Stack Web Developer specializing in Laravel, React, Next.js, Node.js, MySQL, PostgreSQL, and scalable web applications."
        />
        <meta
          name="keywords"
          content="Abdul Aziz De Borja, Full Stack Developer, Laravel Developer, React Developer, Next.js Developer, Node.js Developer, Web Developer Philippines, Portfolio"
        />
        <meta name="author" content="Abdul Aziz De Borja" />

        <meta
          property="og:title"
          content="Abdul Aziz De Borja | Full-Stack Web Developer"
        />
        <meta
          property="og:description"
          content="Portfolio showcasing projects, experience, certifications, and publications."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abduldbdev.vercel.app" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="AbdulDBDev Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Abdul Aziz De Borja | Full-Stack Web Developer"
        />
        <meta
          name="twitter:description"
          content="Full-Stack Web Developer specializing in Laravel, React, Next.js, Node.js, and scalable web applications."
        />
        <meta name="twitter:image" content="/og-image.png" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Theme */}
        <meta name="theme-color" content="#ffffff" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-full overflow-x-hidden">
        <AuthProvider>
          <SplashScreen />
          {/* <VisitNotifier /> */}
          <AOSProvider />
          <Navbar />
          <Particle />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
