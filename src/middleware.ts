import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || ""
  const { pathname, search } = req.nextUrl

  if (host === "domains.9ruby.com") {
    if (pathname === "/" || pathname === "") {
      const url = req.nextUrl.clone()
      url.pathname = "/domains"
      return NextResponse.rewrite(url)
    }
    if (!pathname.startsWith("/domains") && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
      const url = req.nextUrl.clone()
      url.pathname = "/domains" + pathname
      return NextResponse.rewrite(url)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
