import LoginGithub from "@/components/sign-in/LoginGithub";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButton from "@/components/sign-in/AuthButton";
import { registerWithCreds } from "../../../actions/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Image from "next/image";

export default function page() {
  const cookieStore = cookies();
  const errorMessage = cookieStore.get("registerError")?.value;

  const errorTimestamp = cookieStore.get("registerErrorTimestamp")?.value;

  if (errorMessage) {
    cookies().set("registerError", "", { maxAge: -1 });
  }
  return (
    <div className="flex items-center justify-center md:mt-24 mt-5 px-5">
      <div className="absolute inset-0 bg-grid-pattern -mt-16"></div>
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <div className="z-30 flex md:flex-row flex-col gap-20 justify-center items-center bg-zinc-950 p-5 md:p-10 rounded-lg border border-zinc-800">
        <Image
          src="/register.png"
          width={250}
          height={350}
          alt="login"
          unoptimized
          className="w-[200px] h-[200px] md:w-[450px] md:h-[450px] object-cover rounded-lg"
        />
        <Card className="relative bg-transparent border-zinc-900 shadow-lg lg:w-[400px] w-full">
          <CardHeader>
            <CardTitle>Kayıt Ol</CardTitle>
            <CardDescription>
              Kayıt olmak için bilgilerinizi girin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={registerWithCreds}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input
                    id="name"
                    placeholder="Ad Soyad"
                    name="name"
                    type="text"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Şifre</Label>
                  <Input
                    id="password"
                    placeholder="Şifre"
                    type="password"
                    required
                    name="password"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <AuthButton title="Kayıt Ol" />
                </div>
                {errorMessage && (
                  <ErrorMessage
                    key={errorTimestamp || new Date().getTime()}
                    message={errorMessage}
                  />
                )}
                <p className="text-xs opacity-70">
                  Hesabın var mı?{" "}
                  <Link href="/sign-in">
                    <Button variant="link" className="px-0 text-xs">
                      Giriş yap
                    </Button>
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
          <CardFooter className="w-full">
            <LoginGithub />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
