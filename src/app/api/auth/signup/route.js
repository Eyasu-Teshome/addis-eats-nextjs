import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    // Set session cookie (24 hours)
    const cookieStore = await cookies();
    cookieStore.set("session", `token_${Date.now()}`, {
      path: "/",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    });
    return NextResponse.json({
      success: true,
      message: "Account created successfully! Welcome to Addis Eats.",
      user: {
        name: body?.name || "New Foodie",
        email: body?.email || "foodie@addiseats.com",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Registration failed. Please check inputs." },
      { status: 400 }
    );
  }
};
