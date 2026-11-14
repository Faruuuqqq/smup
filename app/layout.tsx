import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard SMUP",
  description: "Dashboard Keketatan SMUP and PMB",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
