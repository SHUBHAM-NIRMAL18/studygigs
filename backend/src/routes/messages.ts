import { Router } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// POST /api/messages
router.post('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { taskId, content, attachments } = req.body;
    const senderId = req.user!.id;

    if (!taskId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify task exists and sender is either poster, accepted solver, or admin
    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { acceptedBid: true }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const posterId = task.posterId;
    const solverId = task.acceptedBid?.solverId;

    if (senderId !== posterId && senderId !== solverId && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You are not a participant in this task' });
    }

    let attachmentsStr: string | null = null;
    if (attachments) {
      attachmentsStr = typeof attachments === 'string' ? attachments : JSON.stringify(attachments);
    }

    const message = await db.message.create({
      data: { taskId, senderId, content, attachments: attachmentsStr },
      include: {
        sender: { select: { id: true, name: true, avatar: true } }
      }
    });

    return res.status(201).json(message);
  } catch (error) {
    console.error('Create message error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
