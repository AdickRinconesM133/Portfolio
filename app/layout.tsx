import type { Metadata } from "next";
import { League_Gothic } from "next/font/google";
import localFont from "next/font/local";
import { Background, Navigation } from "./components/index";
import "./globals.css";

const league_gothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
});

const neuemontreal = localFont({
  src: [
    {
      path: "./fonts/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-bold.otf",
      weight: "500",
      style: "normal",
    }
  ],
  variable: "--font-neuemontreal",
});

export const metadata: Metadata = {
  title: "Adick Portfolio",
  description: "Portfolio of Adick Rincones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${league_gothic.variable} ${neuemontreal.variable} antialiased`}
      >
        <Background />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
