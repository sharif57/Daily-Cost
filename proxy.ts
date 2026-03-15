import { NextResponse } from "next/server";
import { decodeJwtPayload } from "@/lib/jwt";

const clearAuthCookie = (response: NextResponse) => {
  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0,
  });
  return response;
};

const isTokenExpired = (token?: string): boolean => {
  if (!token) {
    return true;
  }

  const payload = decodeJwtPayload(token);

  if (!payload || typeof payload.exp !== "number") {
    return true;
  }

  return Date.now() >= payload.exp * 1000;
};

export function proxy(request: any) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const expired = isTokenExpired(token);

  const isPublicAuthRoute =
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password";

  if (isPublicAuthRoute) {
    if (token && !expired) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (token && expired) {
      return clearAuthCookie(NextResponse.next());
    }

    return NextResponse.next();
  }

  if (!token || expired) {
    return clearAuthCookie(NextResponse.redirect(new URL("/login", request.url)));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};