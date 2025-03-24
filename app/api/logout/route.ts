import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (userId) {
    // Notify the backend to invalidate the refresh token
    await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  }

  // Clear the cookies
  cookieStore.delete("accessToken");
  cookieStore.delete("userData");

  return NextResponse.json({ success: true });
}
