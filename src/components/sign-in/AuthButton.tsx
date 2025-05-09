"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

export default function AuthButton({
  title,
  loading,
}: {
  title: string;
  loading?: boolean;
}) {
  const { data: session, update, status } = useSession();

  useEffect(() => {
    const updateSession = async () => {
      try {
        await update();
      } catch (error) {
        console.error("Session update error:", error);
      }
    };

    if (status === "loading" || !session) {
      updateSession();
    }
  }, [session, update, status]);

  return (
    <Button
      disabled={loading}
      type="submit"
      className={
        loading ? "opacity-50 cursor-not-allowed text-white" : "text-white"
      }
    >
      {loading ? (
        <div className="flex space-x-2 justify-center items-center dark:invert mt-1">
          <span className="sr-only">Loading...</span>
          <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
        </div>
      ) : (
        title
      )}
    </Button>
  );
}
