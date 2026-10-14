import { NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request) {
  const session = await getSession()


  // Rapid redirect before rendering if session cookie is missing
  if (!session) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// // Narrow matcher configuration prevents adding latency to static assets
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};











