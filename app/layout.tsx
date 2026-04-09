import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import QueryProvider from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invito — Vjenčane Pozivnice Online",
  description:
    "Kreirajte prekrasne digitalne vjenčane pozivnice, pratite RSVP odgovore i podijelite ih s gostima u minutama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs">
      <body
        className={`${geistSans.variable} ${playfairDisplay.variable} min-h-screen antialiased`}
      >
        <QueryProvider>
          <NavBar />
          <main className="w-full">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
