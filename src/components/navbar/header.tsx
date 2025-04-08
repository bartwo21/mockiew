"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Logout from "@/components/navbar/Logout";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    if (pathname === href) {
      router.refresh();
    } else {
      router.push(href);
    }
  };

  return (
    <header className="w-full py-6 bg-[#09090B] shadow-md z-10">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-8 justify-center">
          <div onClick={() => handleNavigation("/")} className="cursor-pointer">
            <span className="text-2xl font-bold text-gray-100">Mockiew</span>
          </div>
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleNavigation("/interviews")}
              className="hidden md:block cursor-pointer"
            >
              <Button variant="outline">Mülakatlar</Button>
            </div>
            <div
              onClick={() => handleNavigation("/interview")}
              className="hidden md:block cursor-pointer"
            >
              <Button variant="outline">Mülakat Oluştur</Button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex">
          {!session?.user ? (
            <>
              <div
                onClick={() => handleNavigation("/sign-in")}
                className="cursor-pointer"
              >
                <Button className="md:mr-4 mr-0" variant="ghost">
                  Giriş Yap
                </Button>
              </div>
              <div
                onClick={() => handleNavigation("/sign-up")}
                className="cursor-pointer"
              >
                <Button className="text-white">Kayıt Ol</Button>
              </div>
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
          <p className="text-zinc-700 p-[7px] lg:px-4 px-0 rounded w-full text-left lg:text-center">
            {session?.user?.name}
          </p>
          <div
            onClick={() => handleNavigation("/interviews")}
            className="w-24 cursor-pointer"
          >
            <Button variant="outline" className="w-full">
              Mülakatlar
            </Button>
          </div>
          {!session?.user ? (
            <>
              <div
                onClick={() => handleNavigation("/sign-in")}
                className="w-24 cursor-pointer"
              >
                <Button className="w-full" variant="ghost">
                  Giriş Yap
                </Button>
              </div>
              <div
                onClick={() => handleNavigation("/sign-up")}
                className="w-24 cursor-pointer"
              >
                <Button className="w-full text-white">Kayıt Ol</Button>
              </div>
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
