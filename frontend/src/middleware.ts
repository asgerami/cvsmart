import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({
    req,
    res,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition
  const isAuthRoute =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup") ||
    req.nextUrl.pathname.startsWith("/reset-password") ||
    req.nextUrl.pathname.startsWith("/update-password");

  // If accessing a protected route without being authenticated
  if (!session && !isAuthRoute && req.nextUrl.pathname !== "/") {
    const redirectUrl = new URL("/login", req.url);
    return NextResponse.redirect(new URL(redirectUrl));
  }

  // If accessing a public route while authenticated
  if (session && isAuthRoute) {
    const redirectUrl = new URL("/", req.url);
    return NextResponse.redirect(new URL(redirectUrl));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
