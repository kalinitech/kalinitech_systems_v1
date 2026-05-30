import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KALINITECH SYSTEMS — Built to Hack the Future",
  description:
    "KALINITECH SYSTEMS is a comprehensive technology enterprise specializing in premium laptop distribution, software development, cybersecurity, business automation, digital marketing, and professional training across Kenya and East Africa. Founded by JARED ANDIKA.",
  keywords: [
    "KALINITECH SYSTEMS",
    "laptops Kenya",
    "refurbished laptops",
    "HP EliteBook",
    "MacBook Pro",
    "Lenovo ThinkPad",
    "Dell Latitude",
    "software development Kenya",
    "cybersecurity Kenya",
    "business automation",
    "digital marketing Kenya",
    "tech training Kenya",
    "JARED ANDIKA",
  ],
  authors: [{ name: "JARED ANDIKA", url: "https://wa.me/254790493120" }],
  icons: {
    icon: "/images/logo/kalinitech_logo.jpg",
  },
  openGraph: {
    title: "KALINITECH SYSTEMS — Built to Hack the Future",
    description:
      "Premium laptops, software development, cybersecurity, business automation, and professional training. Your complete technology partner in Kenya.",
    url: "https://kalinitech.systems",
    siteName: "KALINITECH SYSTEMS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KALINITECH SYSTEMS — Built to Hack the Future",
    description:
      "Premium laptops, software development, cybersecurity, business automation, and professional training in Kenya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
