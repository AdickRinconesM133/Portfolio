import type { Metadata } from "next";
import { League_Gothic } from "next/font/google";
import localFont from "next/font/local";
import { Background, CustomCursor, LayoutContent, LoadingScreen, Navigation, SmoothScroll } from "./components/index";
import { MenuProvider } from "./context/MenuContext";
import { LoadingProvider } from "./context/LoadingContext";
import { TransitionProvider } from "./context/TransitionContext";
import "./globals.css";

const league_gothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
});

const neuemontreal = localFont({
  src: [
    {
      path: "./fonts/Montreal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Montreal-Bold.ttf",
      weight: "700",
      style: "normal",
    }
  ],
  variable: "--font-neuemontreal",
});

const siteDescription =
  "Software Engineer based in Buenos Aires, Argentina. 5+ years building scalable systems with Next.js, React, Rust, and Golang.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adickrincones.com"),
  title: {
    default: "Adick Rincones — Software Engineer",
    template: "%s | Adick Rincones",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Adick Rincones",
    title: "Adick Rincones — Software Engineer",
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: "Adick Rincones — Software Engineer",
    description: siteDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adick Rincones",
  url: "https://adickrincones.com",
  jobTitle: "Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [
    "https://linkedin.com/in/adickrincones/",
    "https://github.com/AdickRinconesM133",
    "https://instagram.com/kyddahh/",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Rust",
    "Golang",
    "Frontend Architecture",
    "Microservices",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${league_gothic.variable} ${neuemontreal.variable} antialiased`}
      >
        <LoadingProvider>
          <MenuProvider>
            <TransitionProvider>
              <SmoothScroll>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-accent focus:text-background focus:px-4 focus:py-2 focus:rounded-full focus:text-sm">
                  Skip to main content
                </a>
                <Background />
                <Navigation />
                <LayoutContent>{children}</LayoutContent>
              </SmoothScroll>
              <LoadingScreen />
              <CustomCursor />
            </TransitionProvider>
          </MenuProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
