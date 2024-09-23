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
      className={pending ? "opacity-50 cursor-not-allowed" : ""}
    >
      {pending ? "İşleniyor..." : title}
    </Button>
  );
}
