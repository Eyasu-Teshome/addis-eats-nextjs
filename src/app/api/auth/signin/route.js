import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json().catch(() => ({}));
    const cookieStore = await cookies();
    cookieStore.set("session", `token_${Date.now()}`, {
      path: "/",
      sameSite: "lax",
    });
    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: { email: body?.email || "foodie@addiseats.com" },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials or request" },
      { status: 400 }
    );
  }
};



