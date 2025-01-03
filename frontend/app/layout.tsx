import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { RecoilContextProvider } from "@/lib/RecoilContextProvider";
import { AppBar } from "@/components/AppBar";
// import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "It's what i think",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000] text-white `}
      >
        
        <AppBar />
        <RecoilContextProvider>

        {children}

        </RecoilContextProvider>
      
        
      </body>
    </html>
  );
}
