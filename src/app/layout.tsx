import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hacker House Goa 2026 | Builder ID",
  description: "Create your official Hacker House Goa 2026 Builder ID and Frame.",
};

import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} font-sans min-h-full flex flex-col bg-[#101510] text-[#FFF7D6]`}>
        {children}
      </body>
    </html>
  );
}
