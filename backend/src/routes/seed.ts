import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db';

const router = Router();

// POST /api/seed
router.post('/', async (req, res) => {
  try {
    // Check if an admin already exists to prevent duplicate seeding
    const existingAdmin = await db.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      return res.json({ message: 'Database already seeded' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);

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
    });

    // Optionally add some dummy users
    const studentPass = await bcrypt.hash('student123', 12);
    await db.user.create({
      data: {
        name: 'Test Student',
        email: 'student@test.com',
        password: studentPass,
        role: 'STUDENT',
        avatar: '👩‍🎓',
        bio: 'Test student account',
      }
    });

    const solverPass = await bcrypt.hash('solver123', 12);
    await db.user.create({
      data: {
        name: 'Test Solver',
        email: 'solver@test.com',
        password: solverPass,
        role: 'SOLVER',
        avatar: '🧑‍💻',
        bio: 'Test solver account',
      }
    });

    return res.status(201).json({ message: 'Database seeded successfully with Admin account' });
  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ error: 'Failed to seed database' });
  }
});

export default router;
