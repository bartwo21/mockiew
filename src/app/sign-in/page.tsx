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
import { loginWithCreds } from "../../../actions/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center justify-center mt-24">
      <div className="absolute inset-0 bg-grid-pattern -mt-16"></div>
      <div className="absolute inset-0 bg-radial-gradient"></div>
      <Card className="w-[450px] relative">
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>
            Hesabınıza giriş yaparak devam edin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginWithCreds}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  placeholder="Şifre"
                  type="password"
                  name="password"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <AuthButton title="Giriş Yap" />
              </div>
              <p className="text-xs opacity-70">
                Hesabın yok mu?{" "}
                <Link href="/sign-up">
                  <Button variant="link" className="px-0 text-xs">
                    Kayıt ol
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
  );
}