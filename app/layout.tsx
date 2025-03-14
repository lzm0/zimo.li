import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const sans = DM_Sans({ subsets: ["latin"], display: "block" });

export const metadata: Metadata = {
  title: "Zimo Li",
  description: "My portfolio website",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className + " scroll-smooth"}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
