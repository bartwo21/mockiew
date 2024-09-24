import { auth } from "@/lib/Auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: session.user });
}
