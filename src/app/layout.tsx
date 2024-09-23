import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/Auth";
import Logout from "@/components/navbar/Logout";

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
          <header className="w-full py-6 bg-[#09090B] shadow-md z-10">
            <nav className="container mx-auto flex justify-between items-center px-4">
              <Link href="/" className="text-xl font-bold text-gray-100">
                Mockiew
              </Link>
              <div>
                {!session?.user ? (
                  <>
                    <Link href="sign-in">
                      <Button className="mr-4" variant="ghost">
                        Giriş Yap
                      </Button>
                    </Link>
                    <Link href="sign-up">
                      <Button className="text-white">Kayıt Ol</Button>
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-x-3 text-sm">
                    <p className="bg-zinc-700 px-2 rounded">
                      {session.user.name}
                    </p>
                    <Logout />
                  </div>
                )}
              </div>
            </nav>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="w-full py-6 bg-[#09090B] text-white text-center z-10">
            <p>&copy; 2024 Mockiew. Tüm hakları saklıdır.</p>
          </footer>
        </body>
      </html>
    </SessionProvider>
  );
}
