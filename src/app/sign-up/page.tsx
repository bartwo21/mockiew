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
// import RegisterForm from "@/components/sign-in/RegisterForm";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Page() {
  const cookieStore = cookies();
  const errorMessage = cookieStore.get("registerError")?.value;
  // const errorTimestamp = cookieStore.get("registerErrorTimestamp")?.value;

  if (errorMessage) {
    cookies().set("registerError", "", { maxAge: -1 });
  }

  return (
    <div className="flex items-center justify-center md:mt-8 mt-5 px-5">
      <div className="absolute inset-0 bg-grid-pattern -mt-16"></div>
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <div className="z-30 flex md:flex-row flex-col gap-20 justify-center items-center bg-zinc-950 p-5 md:p-10 rounded-lg border border-zinc-800">
        <Image
          src="/register.png"
          width={250}
          height={350}
          alt="login"
          unoptimized
          className="w-[200px] h-[200px] md:w-[450px] md:h-[450px] md:block hidden object-cover rounded-lg"
        />
        <Card className="bg-transparent relative border-none shadow-none lg:w-[400px] w-full">
          <CardHeader>
            <CardTitle>Kayıt Ol</CardTitle>
            <CardDescription>Kayıt olmak için birini seçin.</CardDescription>
          </CardHeader>
          {/* <CardContent>
            <RegisterForm
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
