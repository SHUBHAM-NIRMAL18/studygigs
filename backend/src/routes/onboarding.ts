import { Router, Response } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Save onboarding response
router.post('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'Onboarding data is required' });
    }

    // Get current user to check their role
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Pre-populate bio based on answers
    let bio = user.bio;
    if (user.role === 'STUDENT') {
      const studyField = data.studyField || 'general studies';
      const academicLevel = (data.academicLevel || '').replace('_', ' ').toLowerCase();
      const subjects = Array.isArray(data.subjects) && data.subjects.length > 0
        ? data.subjects.join(', ')
        : 'various subjects';

      bio = `🎓 ${academicLevel.charAt(0).toUpperCase() + academicLevel.slice(1)} Student in ${studyField}. Looking for help in: ${subjects}.`;
    } else if (user.role === 'SOLVER') {
      const qualification = (data.qualification || '').replace('_', ' ').toLowerCase();
      const experience = data.experience || 'some';
      const subjects = Array.isArray(data.subjects) && data.subjects.length > 0
        ? data.subjects.join(', ')
        : 'various subjects';

      bio = `🧑‍💻 Qualified ${qualification.toUpperCase()} expert with ${experience} of experience. Specializing in: ${subjects}.`;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        onboardingCompleted: true,
        onboardingData: data,
        bio,
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
        createdAt: true,
        onboardingCompleted: true,
        onboardingData: true,
      }
    });

    return res.json({
      success: true,
      message: 'Onboarding completed successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Onboarding submit error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get onboarding data if any
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
        onboardingData: true,
        role: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Fetch onboarding error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
