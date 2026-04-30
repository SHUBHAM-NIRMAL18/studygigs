import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

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
          raw: credentials,
        })

        if (!email || !password) {
          console.error('authorize failed: missing email/password', { email, passwordLength: password?.length ?? 0 })
          throw new Error('Email and password are required')
        }

        const user = await db.user.findFirst({
          where: { email }
        })
        console.log('authorize user lookup', { userFound: Boolean(user), email })

        if (!user) {
          console.error('authorize failed: no user found', { email })
          throw new Error('No account found with this email')
        }

        const isValid = await bcrypt.compare(password, user.password)
        console.log('authorize password compare', { email, isValid })
        if (!isValid) {
          console.error('authorize failed: invalid password', { email })
          throw new Error('Invalid password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role: string }).role
        token.avatar = (user as { avatar: string | null }).avatar
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.avatar = token.avatar as string | null
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
