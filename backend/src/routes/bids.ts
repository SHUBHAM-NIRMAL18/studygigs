import { Router } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// POST /api/bids
router.post('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { taskId, proposedPrice, deliveryDays, message } = req.body;
    const solverId = req.user!.id;

    if (!taskId || !proposedPrice || !deliveryDays || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if solver already bid on this task
    const existingBid = await db.bid.findFirst({
      where: { taskId, solverId, status: 'PENDING' }
    });
    if (existingBid) {
      return res.status(400).json({ error: 'You already have a pending bid on this task' });
    }

    const bid = await db.bid.create({
      data: {
        taskId,
        solverId,
        proposedPrice: parseFloat(proposedPrice),
        deliveryDays: parseInt(deliveryDays),
        message
      },
      include: {
        solver: { select: { id: true, name: true, avatar: true, rating: true, completedTasks: true } }
      }
    });

    // Update task status to BIDDING if it was OPEN
    await db.task.updateMany({
      where: { id: taskId, status: 'OPEN' },
      data: { status: 'BIDDING' }
    });

    return res.status(201).json(bid);
  } catch (error) {
    console.error('Create bid error:', error);
    return res.status(500).json({ error: 'Failed to create bid' });
  }
});

// PATCH /api/bids/:id
router.patch('/:id', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!status || !['ACCEPTED', 'REJECTED', 'WITHDRAWN'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const bid = await db.bid.findUnique({
      where: { id },
      include: { task: true }
    });
    if (!bid) {
      return res.status(404).json({ error: 'Bid not found' });
    }

    // Authorization checks
    if (status === 'ACCEPTED' || status === 'REJECTED') {
      if (bid.task.posterId !== req.user!.id && req.user!.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden: You do not own the task associated with this bid' });
      }
    } else if (status === 'WITHDRAWN') {
      if (bid.solverId !== req.user!.id && req.user!.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden: You did not submit this bid' });
      }
    }

    if (status === 'ACCEPTED') {
      // Accept this bid and reject all others
      await db.$transaction([
        db.bid.update({ where: { id }, data: { status: 'ACCEPTED' } }),
        db.bid.updateMany({
          where: { taskId: bid.taskId, status: 'PENDING', id: { not: id } },
          data: { status: 'REJECTED' }
        }),
        db.task.update({
          where: { id: bid.taskId },
          data: { status: 'IN_PROGRESS', acceptedBidId: id }
        })
      ]);
    } else {
      await db.bid.update({ where: { id }, data: { status } });
    }

    const updatedBid = await db.bid.findUnique({
      where: { id },
      include: {
        solver: { select: { id: true, name: true, avatar: true } },
        task: { select: { id: true, title: true, status: true } }
      }
    });

    return res.json(updatedBid);
  } catch (error) {
    console.error('Update bid error:', error);
    return res.status(500).json({ error: 'Failed to update bid' });
  }
});

export default router;
