import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, senderId, content } = body

    if (!taskId || !senderId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const message = await db.message.create({
      data: { taskId, senderId, content },
      include: { sender: { select: { id: true, name: true, avatar: true } } }
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Create message error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
