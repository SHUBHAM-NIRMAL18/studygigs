import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status || !['APPROVED', 'REVISION_REQUESTED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const deliverable = await db.deliverable.findUnique({ where: { id } })
    if (!deliverable) return NextResponse.json({ error: 'Deliverable not found' }, { status: 404 })

    const updateData: Record<string, unknown> = { status }

    if (status === 'APPROVED') {
      // Mark task as completed, increment solver's completedTasks
      const acceptedBid = await db.bid.findFirst({ where: { taskId: deliverable.taskId, status: 'ACCEPTED' } })
      await db.$transaction([
        db.task.update({ where: { id: deliverable.taskId }, data: { status: 'COMPLETED' } }),
        db.user.update({
          where: { id: deliverable.solverId },
          data: {
            completedTasks: { increment: 1 },
            totalEarnings: acceptedBid ? { increment: acceptedBid.proposedPrice } : { increment: 0 }
          }
        })
      ])
    }

    if (status === 'REVISION_REQUESTED') {
      // Increment revision count, set task back to IN_PROGRESS
      const task = await db.task.findUnique({ where: { id: deliverable.taskId } })
      if (task && task.revisionCount >= 3) {
        return NextResponse.json({ error: 'Maximum revision rounds (3) reached' }, { status: 400 })
      }
      await db.task.update({
        where: { id: deliverable.taskId },
        data: { revisionCount: { increment: 1 }, status: 'IN_PROGRESS' }
      })
    }

    if (status === 'REJECTED') {
      await db.task.update({ where: { id: deliverable.taskId }, data: { status: 'CANCELLED' } })
    }

    const updated = await db.deliverable.update({
      where: { id },
      data: updateData,
      include: { solver: { select: { id: true, name: true, avatar: true } } }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update deliverable error:', error)
    return NextResponse.json({ error: 'Failed to update deliverable' }, { status: 500 })
  }
}
