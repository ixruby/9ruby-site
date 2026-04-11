import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BotanicalEffects from "@/components/BotanicalEffects";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://home.9ruby.com"),
  title: {
    default: "9Ruby — AI-Powered Agency by IX Ruby",
    template: "%s",
  },
  description:
    "The world's most intelligent AI agency. Autonomous agents that plan, create, and scale — 24/7. Explore 9Ruby AI, Design Studio, Dispatch, and more.",
  keywords: [
    "9Ruby",
    "Nine Ruby",
    "IX Ruby",
    "AI agency",
    "AI agents",
    "autonomous marketing",
    "AI chatbots",
    "website design",
    "SEO",
    "Next.js templates",
    "AI tools",
    "design studio",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "9Ruby — AI-Powered Agency",
    description:
      "Autonomous AI agents that never sleep. Built by IX Ruby Agency.",
    type: "website",
    url: "https://home.9ruby.com",
    siteName: "9Ruby",
  },
  twitter: {
    card: "summary_large_image",
    title: "9Ruby — AI-Powered Agency by IX Ruby",
    description:
      "Autonomous AI agents that plan, create, and scale — 24/7. Explore 9Ruby AI, Design Studio, Dispatch, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <meta name="theme-color" content="#C41A3B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full" style={{ background: "#F5F3EE", color: "#111111" }}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C41A3B] focus:text-white focus:rounded-full focus:text-sm">
          Skip to content
        </a>
        <BotanicalEffects />
        {children}
        <CookieConsent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('[SW] Registered:', reg.scope))
                    .catch(err => console.warn('[SW] Registration failed:', err));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
