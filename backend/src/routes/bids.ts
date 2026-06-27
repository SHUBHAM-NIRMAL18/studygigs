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
      // Idempotency check:
      if (bid.task.status === 'IN_PROGRESS' && bid.task.acceptedBidId === id) {
        const updatedBid = await db.bid.findUnique({
          where: { id },
          include: {
            solver: { select: { id: true, name: true, avatar: true } },
            task: { select: { id: true, title: true, status: true } }
          }
        });
        return res.json(updatedBid);
      }

      if (bid.task.status !== 'OPEN' && bid.task.status !== 'BIDDING') {
        return res.status(400).json({ error: 'This task is already in progress or has been completed/cancelled' });
      }

      // Check poster balance
      const poster = await db.user.findUnique({
        where: { id: bid.task.posterId },
        select: { balance: true }
      });

      if (!poster) {
        return res.status(404).json({ error: 'Poster user not found' });
      }

      if (poster.balance < bid.proposedPrice) {
        return res.status(400).json({ error: 'Insufficient balance. Fund your wallet to accept this proposal.' });
      }

      // Accept this bid and reject all others, deduct poster balance, set task escrow, and create transaction
      await db.$transaction(async (tx) => {
        // Deduct poster balance
        await tx.user.update({
          where: { id: bid.task.posterId },
          data: { balance: { decrement: bid.proposedPrice } }
        });

        // Set task status, acceptedBidId and escrowAmount
        await tx.task.update({
          where: { id: bid.taskId },
          data: {
            status: 'IN_PROGRESS',
            acceptedBidId: id,
            escrowAmount: bid.proposedPrice
          }
        });

        // Accept the bid
        await tx.bid.update({
          where: { id },
          data: { status: 'ACCEPTED' }
        });

        // Reject other pending bids
        await tx.bid.updateMany({
          where: { taskId: bid.taskId, status: 'PENDING', id: { not: id } },
          data: { status: 'REJECTED' }
        });

        // Log transaction
        await tx.transaction.create({
          data: {
            userId: bid.task.posterId,
            taskId: bid.taskId,
            type: 'ESCROW_LOCK',
            amount: bid.proposedPrice,
            status: 'COMPLETED'
          }
        });
      });
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
