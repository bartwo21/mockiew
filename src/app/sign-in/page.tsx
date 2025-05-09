import { cookies } from "next/headers";
import LoginGithub from "@/components/sign-in/LoginGithub";
import LoginGoogle from "@/components/sign-in/LoginGoogle";
import React from "react";
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import LoginForm from "@/components/sign-in/LoginForm";
import Image from "next/image";

export default function Page() {
  const cookieStore = cookies();
  const errorMessage = cookieStore.get("loginError")?.value;
  // const errorTimestamp = cookieStore.get("loginErrorTimestamp")?.value;

  if (errorMessage) {
    cookies().set("loginError", "", { maxAge: -1 });
  }

  return (
    <div className="flex items-center justify-center md:mt-24 mt-5 px-5">
      <div className="absolute inset-0 bg-grid-pattern -mt-16"></div>
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <div className="z-30 flex md:flex-row flex-col gap-20 justify-center items-center bg-zinc-950 p-5 md:p-10 rounded-lg border border-zinc-800">
        <Image
          src="/login.png"
          width={350}
          height={350}
          alt="login"
          unoptimized
          className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] md:block hidden object-cover rounded-lg"
        />
        <Card className="bg-transparent relative border-none shadow-none shadow-zinc-900 lg:w-[400px] w-full">
          <CardHeader>
            <CardTitle>Giriş Yap</CardTitle>
            <CardDescription>
              Hesabınıza giriş yapmak için birini seçin.
            </CardDescription>
          </CardHeader>
          {/* <CardContent>
            <LoginForm
              errorMessage={errorMessage}
              errorTimestamp={errorTimestamp}
            /> 
          </CardContent>*/}
          <CardFooter className="w-full flex flex-col gap-3">
            <LoginGithub />
            <LoginGoogle />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
