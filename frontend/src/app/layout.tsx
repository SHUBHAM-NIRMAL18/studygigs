import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyGig — Peer-to-Peer Academic Task Marketplace",
  description: "Post assignment requirements with budgets, get qualified solvers to bid. Escrow-protected payments, revision rounds, and dispute resolution.",
  keywords: ["StudyGig", "academic marketplace", "assignment help", "peer-to-peer", "escrow", "tutoring"],
  icons: {
    icon: "/logo.svg",
  },
};

import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
