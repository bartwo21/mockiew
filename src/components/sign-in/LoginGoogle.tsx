"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { LoadingSpinner } from "@/helpers/loadingSpinner";
import { useAuth } from "@/context/AuthContext";

export default function LoginGoogle() {
  const { loadingProvider, setLoadingProvider } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      setLoadingProvider("google");
      await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      setLoadingProvider(null);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center gap-2"
      onClick={handleGoogleSignIn}
      disabled={loadingProvider !== null}
    >
      <FcGoogle className="w-5 h-5" />
      {loadingProvider === "google" ? (
        <div className="mt-1">
          <LoadingSpinner />
        </div>
      ) : (
        "Google ile devam et"
      )}
    </Button>
  );
}
