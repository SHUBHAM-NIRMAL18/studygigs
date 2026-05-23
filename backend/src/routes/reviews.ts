import { Router } from 'express';
import { db } from '../db';

const router = Router();

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { taskId, reviewerId, revieweeId, rating, comment } = req.body;

    if (!taskId || !reviewerId || !revieweeId || !rating || !comment) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const ratingInt = parseInt(rating);
    if (ratingInt < 1 || ratingInt > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
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
