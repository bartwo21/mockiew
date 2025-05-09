"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButton from "@/components/sign-in/AuthButton";
import { registerWithCreds } from "../../../actions/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface RegisterFormProps {
  errorMessage?: string;
  errorTimestamp?: string;
}

export default function RegisterForm({
  errorMessage,
  errorTimestamp,
}: RegisterFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await registerWithCreds(formData);
    } catch (error) {
      console.error("Register error:", error);
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} onSubmit={() => setLoading(true)}>
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
          <AuthButton title="Kayıt Ol" loading={loading} />
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
  );
}
