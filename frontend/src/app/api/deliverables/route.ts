import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, solverId, content } = body

    if (!taskId || !solverId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get current version count
    const existingCount = await db.deliverable.count({ where: { taskId } })

    const deliverable = await db.deliverable.create({
      data: {
        taskId, solverId, content,
        version: existingCount + 1,
        status: 'SUBMITTED'
      },
      include: { solver: { select: { id: true, name: true, avatar: true } } }
    })

    // Update task status to REVIEW
    await db.task.update({ where: { id: taskId }, data: { status: 'REVIEW' } })

    return NextResponse.json(deliverable, { status: 201 })
  } catch (error) {
    console.error('Create deliverable error:', error)
    return NextResponse.json({ error: 'Failed to submit deliverable' }, { status: 500 })
  }
}
