import { auth } from "@/lib/Auth";
import { NextResponse } from "next/server";

export const GET = auth(function GET(req) {
  if (req.auth) {
    return NextResponse.json(req.auth);
  }
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
});
