import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Noto_Kufi_Arabic,
  Noto_Sans,
} from "next/font/google";
import "./globals.css";

const siteUrl = "https://www.9ruby.com";
const themeInitScript = `document.documentElement.dataset.theme="dark";document.documentElement.style.colorScheme="dark";`;

const notoSans = Noto_Sans({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "9Ruby | AI Agents, Websites, and Automation by IX Ruby",
    template: "%s | 9Ruby",
  },
  description:
    "Dubai-based 9Ruby builds AI agents, websites, voice systems, and automation for modern international brands. Powered by IX Ruby.",
  keywords: [
    "9Ruby",
    "Nine Ruby",
    "IX Ruby",
    "IXR",
    "AI agency",
    "Dubai AI agency",
    "UAE web design",
    "AI agents",
    "voice agents",
    "website design",
    "automation",
    "SEO",
    "Next.js templates",
    "AI tools",
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "9Ruby | AI Agents, Websites, and Automation",
    description:
      "Dubai-based AI agents, websites, voice systems, and automation built by IX Ruby.",
    type: "website",
    url: siteUrl,
    siteName: "9Ruby",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "9Ruby by IX Ruby",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "9Ruby | AI Agents, Websites, and Automation",
    description:
      "Dubai-based AI agents, websites, voice systems, and automation built by IX Ruby.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "9Ruby",
        alternateName: ["IX Ruby", "IX Ruby Agency", "IXR"],
        url: siteUrl,
        logo: `${siteUrl}/icons/icon-512.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        sameAs: ["https://ai.9ruby.com", "https://home.9ruby.com"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "9Ruby",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${notoSans.variable} ${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} ${notoKufiArabic.variable} dark h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:text-sm"
          style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
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
