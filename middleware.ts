import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyRequestToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes — require authentication
  if (pathname.startsWith("/admin")) {
    const user = await verifyRequestToken(request)
    if (!user) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Login page — redirect to admin if already authenticated
  if (pathname === "/login") {
    const user = await verifyRequestToken(request)
    if (user) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
