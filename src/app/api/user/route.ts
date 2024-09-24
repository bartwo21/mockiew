// src/app/api/user/route.ts

import { auth } from "@/lib/Auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth(); // Sunucu tarafında kullanıcı oturum bilgisi alınıyor

  if (!session) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: session.user });
}
