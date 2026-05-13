import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Return success anyway to avoid email enumeration
      return NextResponse.json({ message: 'If an account exists, a reset link has been sent' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 3600000) // 1 hour

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry
      }
    })

    // MOCK EMAIL SENDING
    // In a real app, use nodemailer or similar service here
    console.log('---------------------------------------------------------')
    console.log(`[AUTH] RESET REQUEST FOR: ${email}`)
    console.log(`[AUTH] TOKEN: ${token}`)
    console.log(`[AUTH] LINK: http://localhost:3000/reset-password?token=${token}`)
    console.log('---------------------------------------------------------')

    return NextResponse.json({ message: 'Reset link sent' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
