import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is accessing dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // In a real app, you would check for authentication token/session
    // For demo purposes, we'll allow access
    // You can uncomment the lines below to simulate authentication check
    // const isAuthenticated = request.cookies.get('auth-token')
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
