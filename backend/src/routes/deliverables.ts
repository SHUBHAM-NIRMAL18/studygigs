import { Router } from 'express';
import { db } from '../db';

const router = Router();

// POST /api/deliverables
router.post('/', async (req, res) => {
  try {
    const { taskId, solverId, content } = req.body;

    if (!taskId || !solverId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get current version count
    const existingCount = await db.deliverable.count({ where: { taskId } });

    const deliverable = await db.deliverable.create({
      data: {
        taskId,
        solverId,
        content,
        version: existingCount + 1,
        status: 'SUBMITTED'
      },
      include: {
        solver: { select: { id: true, name: true, avatar: true } }
      }
    });

    // Update task status to REVIEW
    await db.task.update({ where: { id: taskId }, data: { status: 'REVIEW' } });

    return res.status(201).json(deliverable);
  } catch (error) {
    console.error('Create deliverable error:', error);
    return res.status(500).json({ error: 'Failed to submit deliverable' });
  }
});

// PATCH /api/deliverables/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['APPROVED', 'REVISION_REQUESTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const deliverable = await db.deliverable.findUnique({ where: { id } });
    if (!deliverable) {
      return res.status(404).json({ error: 'Deliverable not found' });
    }

    const updateData: Record<string, any> = { status };

    if (status === 'APPROVED') {
      // Mark task as completed, increment solver's completedTasks
      const acceptedBid = await db.bid.findFirst({
        where: { taskId: deliverable.taskId, status: 'ACCEPTED' }
      });
      await db.$transaction([
        db.task.update({ where: { id: deliverable.taskId }, data: { status: 'COMPLETED' } }),
        db.user.update({
          where: { id: deliverable.solverId },
          data: {
            completedTasks: { increment: 1 },
            totalEarnings: acceptedBid ? { increment: acceptedBid.proposedPrice } : { increment: 0 }
          }
        })
      ]);
    }

    if (status === 'REVISION_REQUESTED') {
      // Increment revision count, set task back to IN_PROGRESS
      const task = await db.task.findUnique({ where: { id: deliverable.taskId } });
      if (task && task.revisionCount >= 3) {
        return res.status(400).json({ error: 'Maximum revision rounds (3) reached' });
      }
      await db.task.update({
        where: { id: deliverable.taskId },
        data: {
          revisionCount: { increment: 1 },
          status: 'IN_PROGRESS'
        }
      });
    }

    if (status === 'REJECTED') {
      await db.task.update({ where: { id: deliverable.taskId }, data: { status: 'CANCELLED' } });
    }

    const updated = await db.deliverable.update({
      where: { id },
      data: updateData,
      include: {
        solver: { select: { id: true, name: true, avatar: true } }
      }
    });

    return res.json(updated);
  } catch (error) {
    console.error('Update deliverable error:', error);
    return res.status(500).json({ error: 'Failed to update deliverable' });
  }
});

export default router;
