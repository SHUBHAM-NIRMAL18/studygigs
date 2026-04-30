import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!status || !['ACCEPTED', 'REJECTED', 'WITHDRAWN'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const bid = await db.bid.findUnique({ where: { id } })
    if (!bid) return NextResponse.json({ error: 'Bid not found' }, { status: 404 })

    if (status === 'ACCEPTED') {
      // Accept this bid and reject all others
      await db.$transaction([
        db.bid.update({ where: { id }, data: { status: 'ACCEPTED' } }),
        db.bid.updateMany({
          where: { taskId: bid.taskId, status: 'PENDING', id: { not: id } },
          data: { status: 'REJECTED' }
        }),
        db.task.update({
          where: { id: bid.taskId },
          data: { status: 'IN_PROGRESS', acceptedBidId: id }
        })
      ])
    } else {
      await db.bid.update({ where: { id }, data: { status } })
    }

    const updatedBid = await db.bid.findUnique({
      where: { id },
      include: { solver: { select: { id: true, name: true, avatar: true } }, task: { select: { id: true, title: true, status: true } } }
    })

    return NextResponse.json(updatedBid)
  } catch (error) {
    console.error('Update bid error:', error)
    return NextResponse.json({ error: 'Failed to update bid' }, { status: 500 })
  }
}
