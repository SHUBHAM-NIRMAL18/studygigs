import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true, email: true, name: true, avatar: true, bio: true,
        role: true, rating: true, completedTasks: true, totalEarnings: true,
        onTimeRate: true, createdAt: true,
        _count: { select: { postedTasks: true, bids: true } }
      },
      orderBy: { createdAt: 'asc' }
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
