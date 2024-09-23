import { auth } from "@/lib/Auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bu sayfa sadece giriş yapmış kullanıcılar içindir.</p>
    </div>
  );
}
