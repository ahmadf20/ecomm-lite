import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();

  const isLogin = req.nextUrl.pathname === "/login";

  // Ideally the token should be validated from the   API
  const token = cookieStore.get("token")?.value;
  const isAuthenticated = Boolean(token);

  if (isLogin && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLogin && !isAuthenticated) {
    return NextResponse.redirect(
      new URL("/login?redirect=" + req.url, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/login"],
};
