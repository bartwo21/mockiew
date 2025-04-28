import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Link from "next/link";
import { auth } from "@/lib/Auth";
import Header from "@/components/navbar/header";

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
  title: "Mockiew",
  description:
    "Mockiew, mülakat soruları ve cevapları ile becerilerinizi test edin ve geliştirin.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <Header session={session} />
          <main className="flex-grow mt-28">
            {children}
            <Toaster />
          </main>
          <footer className="w-full pt-6 bg-[#09090B] text-white text-center z-10 flex justify-around mt-40">
            <div className="z-10 p-2 bg-slate-300 rounded-t-2xl opacity-40">
              <p className="text-xs text-gray-800 text-center">
                Made with ❤️ by{" "}
                <Link
                  target="_blank"
                  className="hover:text-primary transition-colors"
                  href="https://bartwo.vercel.app/"
                >
                  Bartu Çakır
                </Link>
              </p>
            </div>
            <p className="opacity-35 text-xs mt-2">
              &copy; 2024 Mockiew. Tüm hakları saklıdır.
            </p>
          </footer>
        </body>
      </html>
    </SessionProvider>
  );
}
