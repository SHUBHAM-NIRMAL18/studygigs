import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@university.edu' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase()
        const password = credentials?.password?.trim()

        console.log('credentials authorize called', {
          email,
          passwordLength: password?.length ?? 0,
        })

        if (!email || !password) {
          console.error('authorize failed: missing email/password')
          throw new Error('Email and password are required')
        }

        try {
          const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
          const gatewaySecret = process.env.GATEWAY_SECRET || 'studygig-gateway-secret'

          const res = await fetch(`${backendUrl}/api/auth/authorize`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json',
              'x-gateway-secret': gatewaySecret,
            },
          })

          if (!res.ok) {
            const data = await res.json()
            console.error('authorize failed on backend:', data)
            throw new Error(data.error || 'Invalid credentials')
          }

          const user = await res.json()
          console.log('authorize success', { email, userId: user.id })
          return user
        } catch (error: any) {
          console.error('authorize error details:', error)
          throw new Error(error.message || 'Authentication service unavailable')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.avatar = (user as any).avatar
        token.onboardingCompleted = (user as any).onboardingCompleted
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
        (session.user as any).avatar = token.avatar as string | null
        (session.user as any).onboardingCompleted = token.onboardingCompleted as boolean
      }
      return session
    }
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'studygig-dev-secret-change-in-production',
}
