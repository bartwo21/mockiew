// export { auth as middleware } from "@/lib/Auth";

import { auth } from "@/lib/Auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/interviews",
  "/interviews/feedback/[id]",
  "/interview",
];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !session) {
    const absoluteUrl = new URL("/sign-in", request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
