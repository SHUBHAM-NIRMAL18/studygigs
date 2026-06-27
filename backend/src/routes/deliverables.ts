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

    // Idempotency Guards:
    if (status === 'APPROVED' && (deliverable.status === 'APPROVED' || deliverable.task.status === 'COMPLETED')) {
      const updated = await db.deliverable.findUnique({
        where: { id },
        include: { solver: { select: { id: true, name: true, avatar: true } } }
      });
      return res.json(updated);
    }
    if (status === 'REJECTED' && (deliverable.status === 'REJECTED' || deliverable.task.status === 'CANCELLED')) {
      const updated = await db.deliverable.findUnique({
        where: { id },
        include: { solver: { select: { id: true, name: true, avatar: true } } }
      });
      return res.json(updated);
    }

    const updateData: Record<string, any> = { status };

    if (status === 'APPROVED') {
      const escrowAmount = deliverable.task.escrowAmount;

      await db.$transaction(async (tx) => {
        // Mark task as completed and clear escrow
        await tx.task.update({
          where: { id: deliverable.taskId },
          data: { status: 'COMPLETED', escrowAmount: 0 }
        });

        if (escrowAmount > 0) {
          const platformFeePercent = deliverable.task.platformFee;
          const fee = escrowAmount * platformFeePercent;
          const payout = escrowAmount - fee;

          // Increment solver balance and totalEarnings
          await tx.user.update({
            where: { id: deliverable.solverId },
            data: {
              completedTasks: { increment: 1 },
              balance: { increment: payout },
              totalEarnings: { increment: payout }
            }
          });

          // Log transaction for Solver (escrow release)
          await tx.transaction.create({
            data: {
              userId: deliverable.solverId,
              taskId: deliverable.taskId,
              type: 'ESCROW_RELEASE',
              amount: payout,
              status: 'COMPLETED'
            }
          });

          // Log transaction for Platform Fee
          await tx.transaction.create({
            data: {
              userId: deliverable.task.posterId,
              taskId: deliverable.taskId,
              type: 'PLATFORM_FEE',
              amount: fee,
              status: 'COMPLETED'
            }
          });
        } else {
          // If for some reason escrow is zero, just update task completions
          await tx.user.update({
            where: { id: deliverable.solverId },
            data: {
              completedTasks: { increment: 1 }
            }
          });
        }
      });
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
      const escrowAmount = deliverable.task.escrowAmount;

      await db.$transaction(async (tx) => {
        // Cancel task and clear escrow
        await tx.task.update({
          where: { id: deliverable.taskId },
          data: { status: 'CANCELLED', escrowAmount: 0 }
        });

        if (escrowAmount > 0) {
          // Refund student (poster)
          await tx.user.update({
            where: { id: deliverable.task.posterId },
            data: { balance: { increment: escrowAmount } }
          });

          // Log refund transaction
          await tx.transaction.create({
            data: {
              userId: deliverable.task.posterId,
              taskId: deliverable.taskId,
              type: 'ESCROW_REFUND',
              amount: escrowAmount,
              status: 'COMPLETED'
            }
          });
        }
      });
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
