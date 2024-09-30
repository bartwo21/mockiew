"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logout from "@/components/navbar/Logout";
import { usePathname } from "next/navigation";

export default function Header({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  return (
    <header className="w-full py-6 bg-[#09090B] shadow-md z-10">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-16 justify-center">
          <Link href="/" className="text-2xl font-bold text-gray-100">
            Mockiew
          </Link>
          <Link href="/interviews" className="hidden md:flex">
            <Button variant="outline">Mülakatlar</Button>
          </Link>
        </div>

        <div className="hidden md:flex">
          {!session?.user ? (
            <>
              <Link href="/sign-in">
                <Button className="md:mr-4 mr-0" variant="ghost">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="text-white">Kayıt Ol</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-x-3 text-sm">
              <p className="bg-zinc-700 p-[7px] px-4 rounded">
                {session?.user?.name}
              </p>
              <Logout />
            </div>
          )}
        </div>

        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden px-4 flex justify-center gap-4 mt-4 items-center">
          <p className="text-zinc-700 p-[7px] px-4 rounded w-full text-center">
            {session?.user?.name}
          </p>
          <Link href="/interviews" className="w-24">
            <Button variant="outline" className="w-full">
              Mülakatlar
            </Button>
          </Link>
          {!session?.user ? (
            <>
              <Link href="/sign-in" className="w-24">
                <Button className="w-full" variant="ghost">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/sign-up" className="w-24">
                <Button className="w-full text-white">Kayıt Ol</Button>
              </Link>
            </>
          ) : (
            <div>
              <Logout />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
