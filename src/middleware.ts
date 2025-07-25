import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();

  const isLogin = req.nextUrl.pathname === "/login";

  const token = cookieStore.get("token")?.value;

  if (isLogin && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLogin && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/login"],
};
