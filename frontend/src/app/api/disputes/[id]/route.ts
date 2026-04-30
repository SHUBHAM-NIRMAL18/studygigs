import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, resolution } = body

    if (!status || !['UNDER_REVIEW', 'RESOLVED', 'CLOSED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = { status }
    if (resolution) updateData.resolution = resolution

    // If resolved, update the task status back to COMPLETED or CANCELLED
    if (status === 'RESOLVED') {
      const dispute = await db.dispute.findUnique({ where: { id } })
      if (dispute) {
        await db.task.update({ where: { id: dispute.taskId }, data: { status: 'COMPLETED' } })
      }
    }

    const dispute = await db.dispute.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(dispute)
  } catch (error) {
    console.error('Update dispute error:', error)
    return NextResponse.json({ error: 'Failed to update dispute' }, { status: 500 })
  }
}
