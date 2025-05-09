"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { LoadingSpinner } from "@/helpers/loadingSpinner";
import { useAuth } from "@/context/AuthContext";

export default function LoginGithub() {
  const { loadingProvider, setLoadingProvider } = useAuth();

  const handleGithubSignIn = async () => {
    try {
      setLoadingProvider("github");
      await signIn("github", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Github sign in error:", error);
      setLoadingProvider(null);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2"
      onClick={handleGithubSignIn}
      disabled={loadingProvider !== null}
    >
      <FaGithub className="w-5 h-5" />
      {loadingProvider === "github" ? (
        <div className="mt-1">
          <LoadingSpinner />
        </div>
      ) : (
        "Github ile devam et"
      )}
    </Button>
  );
}
