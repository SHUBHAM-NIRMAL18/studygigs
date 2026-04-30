import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [
      totalTasks,
      openTasks,
      completedTasks,
      inProgressTasks,
      disputedTasks,
      totalUsers,
      totalBids,
      completedBids
    ] = await Promise.all([
      db.task.count(),
      db.task.count({ where: { status: { in: ['OPEN', 'BIDDING'] } } }),
      db.task.count({ where: { status: 'COMPLETED' } }),
      db.task.count({ where: { status: { in: ['IN_PROGRESS', 'REVIEW'] } } }),
      db.task.count({ where: { status: 'DISPUTED' } }),
      db.user.count(),
      db.bid.count(),
      db.bid.count({ where: { status: 'ACCEPTED' } })
    ])

    // Calculate total revenue (platform fees from completed tasks)
    const acceptedBids = await db.bid.findMany({
      where: { status: 'ACCEPTED' },
      include: { task: { select: { platformFee: true, status: true } } }
    })
    const totalRevenue = acceptedBids
      .filter(b => b.task.status === 'COMPLETED')
      .reduce((sum, b) => sum + b.proposedPrice * b.task.platformFee, 0)

    // Category breakdown
    const categoryBreakdown = await db.task.groupBy({
      by: ['category'],
      _count: { id: true }
    })

    // Academic level breakdown
    const levelBreakdown = await db.task.groupBy({
      by: ['academicLevel'],
      _count: { id: true }
    })

    return NextResponse.json({
      totalTasks, openTasks, completedTasks, inProgressTasks, disputedTasks,
      totalUsers, totalBids, totalRevenue: Math.round(totalRevenue * 100) / 100,
      categoryBreakdown: categoryBreakdown.map(c => ({ category: c.category, count: c._count.id })),
      levelBreakdown: levelBreakdown.map(l => ({ level: l.academicLevel, count: l._count.id }))
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
