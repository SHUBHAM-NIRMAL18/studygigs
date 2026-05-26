import { Router, Response } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET all users
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
        onboardingCompleted: true,
        onboardingData: true,
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

// GET single user profile with reviews
router.get('/:id', async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.params.id },
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
        onboardingCompleted: true,
        onboardingData: true,
        createdAt: true,
        receivedReviews: {
          include: {
            reviewer: { select: { id: true, name: true, avatar: true } }
          },
          orderBy: { createdAt: 'desc' }
        },
        _count: { select: { postedTasks: true, bids: true } }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Get single user error:', error);
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// PUT update profile
router.put('/profile', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, bio, avatar, onboardingData } = req.body;

    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Merge onboardingData safely
    let mergedOnboardingData = user.onboardingData || {};
    if (onboardingData) {
      mergedOnboardingData = {
        ...(user.onboardingData as object || {}),
        ...onboardingData
      };
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: name !== undefined ? name : user.name,
        bio: bio !== undefined ? bio : user.bio,
        avatar: avatar !== undefined ? avatar : user.avatar,
        onboardingData: mergedOnboardingData
      },
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
        onboardingCompleted: true,
        onboardingData: true,
        createdAt: true,
        _count: { select: { postedTasks: true, bids: true } }
      }
    });

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
