import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, initiatorId, reason } = body

    if (!taskId || !initiatorId || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const dispute = await db.dispute.create({
      data: { taskId, initiatorId, reason, status: 'OPEN' }
    })

    // Update task status to DISPUTED
    await db.task.update({ where: { id: taskId }, data: { status: 'DISPUTED' } })

    return NextResponse.json(dispute, { status: 201 })
  } catch (error) {
    console.error('Create dispute error:', error)
    return NextResponse.json({ error: 'Failed to create dispute' }, { status: 500 })
  }
}
