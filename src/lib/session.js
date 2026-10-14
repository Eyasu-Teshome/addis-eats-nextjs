import { cookies } from "next/headers";

// Simulated user database
const USERS = {
  "sess_customer123": { id: "usr_01", name: "Almaz", role: "customer" },
  "sess_staff456": { id: "usr_02", name: "Abebe", role: "staff" },
};

/**
 * Universal session reader used across all server surfaces.
 * Reading cookies dynamically marks the route as dynamic.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  
  if (!token) return null;
  return USERS[token] || null;
}

/**
 * Sets session cookie with strict security flags.
 */
export async function setSessionCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set("user", token, {
    httpOnly: true, // Prevents XSS scripts from reading the token
    secure: process.env.NODE_ENV === "production", // Transmitted via HTTPS only
    sameSite: "lax", // Protects against Cross-Site Request Forgery (CSRF)
    maxAge: 60 * 60 * 24 * 7, // 7-day expiry date.now()
    path: "/",
  });
}

/**
 * Clears session cookie on sign-out.
 */
export async function destroySessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}



