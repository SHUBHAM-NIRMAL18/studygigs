import { Router } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// POST /api/deliverables
router.post('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { taskId, content, attachments } = req.body;
    const solverId = req.user!.id;

    if (!taskId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify task exists and this solver is the assigned solver
    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { acceptedBid: true }
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.acceptedBid?.solverId !== solverId && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You are not the assigned solver for this task' });
    }

    // Get current version count
    const existingCount = await db.deliverable.count({ where: { taskId } });

    let attachmentsStr: string | null = null;
    if (attachments) {
      attachmentsStr = typeof attachments === 'string' ? attachments : JSON.stringify(attachments);
    }

    const deliverable = await db.deliverable.create({
      data: {
        taskId,
        solverId,
        content,
        version: existingCount + 1,
        status: 'SUBMITTED',
        attachments: attachmentsStr
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
router.patch('/:id', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!status || !['APPROVED', 'REVISION_REQUESTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const deliverable = await db.deliverable.findUnique({
      where: { id },
      include: { task: true }
    });
    if (!deliverable) {
      return res.status(404).json({ error: 'Deliverable not found' });
    }

    // Verify task owner permissions
    if (deliverable.task.posterId !== req.user!.id && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You do not own the task associated with this deliverable' });
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
