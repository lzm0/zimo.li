import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "block" });

export const metadata: Metadata = {
  title: "Zimo Li",
  description: "My portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased max-w-2xl my-40 mx-6 md:mx-auto">
        {children}
      </body>
    </html>
  );
}
