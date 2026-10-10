import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token")?.value ??
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  if (!sessionCookie) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};