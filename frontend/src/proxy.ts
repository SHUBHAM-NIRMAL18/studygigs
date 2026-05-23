import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Check if it's an API route or static uploads route
  if (path.startsWith('/api') || path.startsWith('/uploads')) {
    // Determine if this is a NextAuth framework route that needs local handling
    const isNextAuthFrameworkRoute =
      path.startsWith('/api/auth') &&
      !path.startsWith('/api/auth/signup') &&
      !path.startsWith('/api/auth/forgot-password') &&
      !path.startsWith('/api/auth/reset-password')

    if (isNextAuthFrameworkRoute) {
      // Let NextAuth handle its own session/signin/signout/csrf endpoints locally
      return NextResponse.next()
    }

    // Otherwise, we proxy the request to the Express backend
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'studygig-dev-secret-change-in-production',
    })

    const requestHeaders = new Headers(request.headers)
    if (token) {
      requestHeaders.set('x-user-id', token.id as string)
      requestHeaders.set('x-user-role', token.role as string)
      requestHeaders.set('x-user-email', token.email as string)
    }

    // Set gateway secret to authorize the request on the Express side
    requestHeaders.set('x-gateway-secret', process.env.GATEWAY_SECRET || 'studygig-gateway-secret')

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
    const url = new URL(request.nextUrl.pathname + request.nextUrl.search, backendUrl)

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/uploads/:path*'],
}
