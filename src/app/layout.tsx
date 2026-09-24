import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raithanna Market | Fresh Indian Groceries Delivered",
  description: "Premium international Indian grocery store. Fresh fruits, vegetables, spices, dry fruits, dals, rice and more delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${jakarta.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-[#111827] bg-[#F8F9FA] min-h-screen flex flex-col antialiased">
        <Header />
        <MobileHeader />
        
        {/* Main content area */}
        <main className="flex-grow pb-[64px] md:pb-0">
          {children}
        </main>

        <Footer />
        <MobileNav />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
