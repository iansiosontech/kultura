import type { Metadata } from "next";
import { Bungee, Literata, Space_Mono } from "next/font/google";
import "./globals.css";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
});

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700"],
  variable: "--font-literata",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Kultura",
  description: "Isang laro ng kultura, kuwento, at pagtuklas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fil">
      <body
        className={`${bungee.variable} ${literata.variable} ${spaceMono.variable} font-body`}
      >
        <div className="app-scroll">{children}</div>
        <div className="chrome-frame" />
      </body>
    </html>
  );
}
