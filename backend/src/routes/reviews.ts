import { Router } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// POST /api/reviews
router.post('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { taskId, revieweeId, rating, comment } = req.body;
    const reviewerId = req.user!.id;

    if (!taskId || !revieweeId || !rating || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ratingInt = parseInt(rating);
    if (ratingInt < 1 || ratingInt > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Verify task exists and is completed
    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { acceptedBid: true }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status !== 'COMPLETED') {
      return res.status(400).json({ error: 'Task must be completed before leaving a review' });
    }

    const posterId = task.posterId;
    const solverId = task.acceptedBid?.solverId;

    if (!solverId) {
      return res.status(400).json({ error: 'No solver accepted for this task' });
    }

    // Check if current user is participant or admin
    if (reviewerId !== posterId && reviewerId !== solverId && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You are not a participant in this task' });
    }

    // Determine and validate expected reviewee
    if (reviewerId === posterId) {
      if (revieweeId !== solverId) {
        return res.status(400).json({ error: 'Reviewee must be the solver of the task' });
      }
    } else if (reviewerId === solverId) {
      if (revieweeId !== posterId) {
        return res.status(400).json({ error: 'Reviewee must be the poster of the task' });
      }
    } else {
      // Admin is posting: just ensure reviewee is a participant
      if (revieweeId !== posterId && revieweeId !== solverId) {
        return res.status(400).json({ error: 'Reviewee must be a participant of the task' });
      }
    }

    // Check if the user has already left a review on this task
    const existingReview = await db.review.findFirst({
      where: {
        taskId,
        reviewerId
      }
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already submitted a review for this task' });
    }

    const review = await db.review.create({
      data: {
        taskId,
        reviewerId,
        revieweeId,
        rating: ratingInt,
        comment
      },
      include: {
        reviewer: { select: { id: true, name: true, avatar: true } },
        reviewee: { select: { id: true, name: true, avatar: true } }
      }
    });

    // Update reviewee's average rating
    const reviews = await db.review.findMany({ where: { revieweeId } });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await db.user.update({
      where: { id: revieweeId },
      data: { rating: Math.round(avgRating * 10) / 10 }
    });

    return res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    return res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;
