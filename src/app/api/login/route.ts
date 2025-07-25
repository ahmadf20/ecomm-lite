import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookiesStore = await cookies();

  const { token } = await req.json();

  if (!token) {
    return new Response(JSON.stringify({ message: "Token is required" }), {
      status: 400,
    });
  }

  cookiesStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return new Response(JSON.stringify({ message: "Login successful" }));
}
