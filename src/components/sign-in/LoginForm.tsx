"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButton from "@/components/sign-in/AuthButton";
import { loginWithCreds } from "../../../actions/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface LoginFormProps {
  errorMessage?: string;
  errorTimestamp?: string;
}

export default function LoginForm({
  errorMessage,
  errorTimestamp,
}: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await loginWithCreds(formData);
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} onSubmit={() => setLoading(true)}>
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
          <AuthButton title="Giriş Yap" loading={loading} />
        </div>
        {errorMessage && (
          <ErrorMessage
            key={errorTimestamp || new Date().getTime()}
            message={errorMessage}
          />
        )}
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
  );
}
