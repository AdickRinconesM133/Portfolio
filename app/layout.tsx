import type { Metadata } from "next";
import { League_Gothic } from "next/font/google";
import localFont from "next/font/local";
import { Background, LayoutContent, Navigation, SmoothScroll } from "./components/index";
import { MenuProvider } from "./context/MenuContext";
import "./globals.css";

const league_gothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
});

const neuemontreal = localFont({
  src: [
    {
      path: "./fonts/ppneuemontreal-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-bold.woff2",
      weight: "700",
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
        <MenuProvider>
          <SmoothScroll>
            <Background />
            <Navigation />
            <LayoutContent>{children}</LayoutContent>
          </SmoothScroll>
        </MenuProvider>
      </body>
    </html>
  );
}
