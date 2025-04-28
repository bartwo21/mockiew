"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Logout from "@/components/navbar/Logout";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ session }: { session: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    if (pathname === href) {
      router.refresh();
    } else {
      router.push(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-8">
        <nav
          className={`mt-4 transition-all duration-300 ${
            isScrolled
              ? "bg-slate-500/10 backdrop-blur-md shadow-lg border-slate-500/10"
              : "bg-transparent border-white/10"
          } lg:rounded-full rounded-2xl border`}
        >
          <div className="flex justify-between items-center py-3 px-12">
            <div className="flex items-center lg:gap-8 gap-4">
              <div
                onClick={() => handleNavigation("/")}
                className="cursor-pointer"
              >
                <span
                  className={`text-2xl font-bold ${
                    pathname === "/" ? "text-gray-100" : "text-gray-400"
                  }`}
                >
                  Mockiew
                </span>
              </div>
              <div className="hidden md:flex items-center lg:gap-4 gap-2 mt-1">
                <div
                  onClick={() => handleNavigation("/interviews")}
                  className="cursor-pointer"
                >
                  <Button
                    variant="ghost"
                    className={`text-gray-400 hover:text-white ${
                      pathname === "/interviews" ? "text-white" : ""
                    }`}
                  >
                    Mülakatlar
                  </Button>
                </div>
                <div
                  onClick={() => handleNavigation("/interview")}
                  className="cursor-pointer"
                >
                  <Button
                    variant="ghost"
                    className={`text-gray-400 hover:text-white ${
                      pathname === "/interview" ? "text-white" : ""
                    }`}
                  >
                    Mülakat Oluştur
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {!session?.user ? (
                <>
                  <div
                    onClick={() => handleNavigation("/sign-in")}
                    className="cursor-pointer"
                  >
                    <Button
                      variant="ghost"
                      className="text-gray-100 hover:text-white"
                    >
                      Giriş Yap
                    </Button>
                  </div>
                  <div
                    onClick={() => handleNavigation("/sign-up")}
                    className="cursor-pointer"
                  >
                    <Button className="bg-white/10 hover:bg-white/20 text-white">
                      Kayıt Ol
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-x-3">
                  <p className="bg-white/10 p-2 px-4 lg:rounded-full rounded-md text-gray-100">
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
          </div>

          {isMenuOpen && (
            <div className="md:hidden px-6 py-4 border-t border-white/10 bg-black">
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => handleNavigation("/interviews")}
                  className="cursor-pointer"
                >
                  <Button
                    variant="ghost"
                    className="w-full text-gray-100 hover:text-white"
                  >
                    Mülakatlar
                  </Button>
                </div>
                {!session?.user ? (
                  <>
                    <div
                      onClick={() => handleNavigation("/sign-in")}
                      className="cursor-pointer"
                    >
                      <Button
                        variant="ghost"
                        className="w-full text-gray-100 hover:text-white"
                      >
                        Giriş Yap
                      </Button>
                    </div>
                    <div
                      onClick={() => handleNavigation("/sign-up")}
                      className="cursor-pointer"
                    >
                      <Button className="w-full bg-white/10 hover:bg-white/20 text-white">
                        Kayıt Ol
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p className="bg-white/10 p-2 px-4 rounded-xl text-gray-100 text-center">
                      {session?.user?.name}
                    </p>
                    <Logout />
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
