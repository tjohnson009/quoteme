import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter, Newsreader } from "next/font/google";

// next/font downloads the fonts at build time and gives us CSS variables (used in globals.css)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-newsreader" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} ${newsreader.variable} font-sans min-h-screen flex flex-col`}>
      <Head>
        <title>QuoteMe</title>
        <meta name="description" content="Save the quotes that stay with you: tag them, add notes, and come back to them anytime." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* app install: the manifest (public/manifest.webmanifest), the iPhone home screen icon and name, and the top bar color in light and dark mode */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="QuoteMe" />
        {/* each theme-color needs its own key, or next/head keeps only the last one */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" key="theme-color-light" />
        <meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)" key="theme-color-dark" />
      </Head>
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
