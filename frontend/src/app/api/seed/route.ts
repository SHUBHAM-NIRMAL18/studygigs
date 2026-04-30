import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    // Check if an admin already exists to prevent duplicate seeding
    const existingAdmin = await db.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (existingAdmin) {
      return NextResponse.json({ message: 'Database already seeded' })
    }

    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Create Admin User
    await db.user.create({
      data: {
        name: 'System Admin',
        email: 'admin@studygig.com',
        password: hashedPassword,
        role: 'ADMIN',
        avatar: '🛡️',
        bio: 'Platform Administrator',
      }
    })

    // Optionally add some dummy users
    const studentPass = await bcrypt.hash('student123', 12)
    await db.user.create({
      data: {
        name: 'Test Student',
        email: 'student@test.com',
        password: studentPass,
        role: 'STUDENT',
        avatar: '👩‍🎓',
        bio: 'Test student account',
      }
    })

    const solverPass = await bcrypt.hash('solver123', 12)
    await db.user.create({
      data: {
        name: 'Test Solver',
        email: 'solver@test.com',
        password: solverPass,
        role: 'SOLVER',
        avatar: '🧑‍💻',
        bio: 'Test solver account',
      }
    })

    return NextResponse.json({ message: 'Database seeded successfully with Admin account' }, { status: 201 })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
