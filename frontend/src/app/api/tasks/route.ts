import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const academicLevel = searchParams.get('academicLevel')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const posterId = searchParams.get('posterId')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (academicLevel) where.academicLevel = academicLevel
    if (status) where.status = status
    if (posterId) where.posterId = posterId
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    }

    const orderBy: Record<string, string> = {}
    switch (sortBy) {
      case 'budget_high': orderBy.budgetMax = 'desc'; break
      case 'budget_low': orderBy.budgetMin = 'asc'; break
      case 'deadline': orderBy.deadline = 'asc'; break
      default: orderBy.createdAt = 'desc'
    }

    const [tasks, total] = await Promise.all([
      db.task.findMany({
        where,
        include: {
          poster: { select: { id: true, name: true, avatar: true, rating: true } },
          bids: { select: { id: true, proposedPrice: true, status: true } },
          _count: { select: { bids: true, messages: true } }
        },
        orderBy,
        skip,
        take: limit,
      }),
      db.task.count({ where })
    ])

    return NextResponse.json({ tasks, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('Get tasks error:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { posterId, title, description, category, academicLevel, budgetMin, budgetMax, deadline } = body

    if (!posterId || !title || !description || !category || !academicLevel || !budgetMin || !budgetMax || !deadline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const task = await db.task.create({
      data: {
        posterId, title, description, category, academicLevel,
        budgetMin: parseFloat(budgetMin), budgetMax: parseFloat(budgetMax),
        deadline: new Date(deadline), platformFee: 0.12
      },
      include: {
        poster: { select: { id: true, name: true, avatar: true, rating: true } },
        bids: true
      }
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Create task error:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
