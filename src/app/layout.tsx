import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@components/navbar";
import Sidebar from "./homepage/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hunter Gather",
  description: "AI Powered Cookbook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-full`}>
        <Navbar />
        {children}
        <div className="h-fit">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
