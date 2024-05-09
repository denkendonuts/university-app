import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

import Providers from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Search for any university in the world",
  title: "University Finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn([inter.className, "min-h-screen flex flex-col"])}>
        <nav className="bg-slate-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <a className="text-white font-semibold" href="/">
              Home
            </a>
            <div>
              <a className="text-white font-semibold" href="/search">
                Search
              </a>
              <a className="text-white font-semibold ml-4" href="/favourites">
                Favourites
              </a>
            </div>
          </div>
        </nav>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
