import { Router } from 'express';
import { db } from '../db';

const router = Router();

// POST /api/messages
router.post('/', async (req, res) => {
  try {
    const { taskId, senderId, content } = req.body;

    if (!taskId || !senderId || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const message = await db.message.create({
      data: { taskId, senderId, content },
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
