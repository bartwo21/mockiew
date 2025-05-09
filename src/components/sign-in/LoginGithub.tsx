"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginGithub() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("github", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Github sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2"
      onClick={handleGithubSignIn}
      disabled={isLoading}
    >
      <FaGithub className="w-5 h-5" />
      {isLoading ? "Yükleniyor..." : "Github ile devam et"}
    </Button>
  );
}
