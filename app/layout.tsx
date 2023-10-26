import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "block" });

export const metadata: Metadata = {
  title: "Zimo Li",
  description: "My portfolio website",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className + " scroll-smooth"}>
      <body>{children}</body>
    </html>
  );
}
