import { Router } from 'express';
import { db } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        role: true,
        rating: true,
        completedTasks: true,
        totalEarnings: true,
        onTimeRate: true,
        createdAt: true,
        _count: { select: { postedTasks: true, bids: true } }
      },
      orderBy: { createdAt: 'asc' }
    });
    return res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
