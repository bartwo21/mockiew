"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export default function AuthButton({ title }: { title: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className={
        pending ? "opacity-50 cursor-not-allowed text-white" : "text-white"
      }
    >
      {pending ? (
        <div className="flex space-x-2 justify-center items-center dark:invert">
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
