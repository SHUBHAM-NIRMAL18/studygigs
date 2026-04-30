import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const task = await db.task.findUnique({
      where: { id },
      include: {
        poster: { select: { id: true, name: true, avatar: true, rating: true, bio: true, completedTasks: true } },
        bids: {
          include: { solver: { select: { id: true, name: true, avatar: true, rating: true, completedTasks: true, onTimeRate: true } } },
          orderBy: { createdAt: 'desc' }
        },
        deliverables: { include: { solver: { select: { id: true, name: true, avatar: true } } }, orderBy: { version: 'desc' } },
        reviews: { include: { reviewer: { select: { id: true, name: true, avatar: true } }, reviewee: { select: { id: true, name: true, avatar: true } } } },
        disputes: true,
        messages: { include: { sender: { select: { id: true, name: true, avatar: true } } }, orderBy: { createdAt: 'asc' } }
      }
    })

    if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    return NextResponse.json(task)
  } catch (error) {
    console.error('Get task error:', error)
    return NextResponse.json({ error: 'Failed to fetch task' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, acceptedBidId } = body

    const updateData: Record<string, unknown> = {}
    if (status) updateData.status = status

    if (acceptedBidId) {
      updateData.acceptedBidId = acceptedBidId
      updateData.status = 'IN_PROGRESS'

      // Accept the winning bid
      await db.bid.update({ where: { id: acceptedBidId }, data: { status: 'ACCEPTED' } })
      // Reject all other pending bids for this task
      await db.bid.updateMany({
        where: { taskId: id, status: 'PENDING', id: { not: acceptedBidId } },
        data: { status: 'REJECTED' }
      })
    }

    const task = await db.task.update({
      where: { id },
      data: updateData,
      include: {
        poster: { select: { id: true, name: true, avatar: true } },
        bids: { include: { solver: { select: { id: true, name: true, avatar: true } } } }
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Update task error:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}
