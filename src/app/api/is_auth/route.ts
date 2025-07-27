import { cookies } from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get("token");

  return new Response(JSON.stringify({ isAuth: !!token }));
}
