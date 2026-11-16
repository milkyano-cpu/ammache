import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyRequestToken } from "@/lib/auth"

// API calls the public website makes without a login
const PUBLIC_API_POSTS = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/newsletter/subscribe",
  "/api/upload-cv",
]

function isPublicApi(request: NextRequest, pathname: string) {
  const method = request.method
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    // the subscriber list is admin-only; every other GET feeds the public pages
    return !pathname.startsWith("/api/newsletter")
  }
  return method === "POST" && PUBLIC_API_POSTS.includes(pathname)
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // API routes — everything that changes data or reads subscribers needs a login
  if (pathname.startsWith("/api/") && !isPublicApi(request, pathname)) {
    const user = await verifyRequestToken(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }
  }

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
  matcher: ["/admin/:path*", "/login", "/api/:path*"],
}
