import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, solverId, proposedPrice, deliveryDays, message } = body

    if (!taskId || !solverId || !proposedPrice || !deliveryDays || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if solver already bid on this task
    const existingBid = await db.bid.findFirst({ where: { taskId, solverId, status: 'PENDING' } })
    if (existingBid) {
      return NextResponse.json({ error: 'You already have a pending bid on this task' }, { status: 400 })
    }

    const bid = await db.bid.create({
      data: {
        taskId, solverId,
        proposedPrice: parseFloat(proposedPrice),
        deliveryDays: parseInt(deliveryDays),
        message
      },
      include: { solver: { select: { id: true, name: true, avatar: true, rating: true, completedTasks: true } } }
    })

    // Update task status to BIDDING if it was OPEN
    await db.task.updateMany({ where: { id: taskId, status: 'OPEN' }, data: { status: 'BIDDING' } })

    return NextResponse.json(bid, { status: 201 })
  } catch (error) {
    console.error('Create bid error:', error)
    return NextResponse.json({ error: 'Failed to create bid' }, { status: 500 })
  }
}
