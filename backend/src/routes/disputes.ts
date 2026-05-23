import { Router } from 'express';
import { db } from '../db';

const router = Router();

// POST /api/disputes
router.post('/', async (req, res) => {
  try {
    const { taskId, initiatorId, reason } = req.body;

    if (!taskId || !initiatorId || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const dispute = await db.dispute.create({
      data: { taskId, initiatorId, reason, status: 'OPEN' }
    });

    // Update task status to DISPUTED
    await db.task.update({ where: { id: taskId }, data: { status: 'DISPUTED' } });

    return res.status(201).json(dispute);
  } catch (error) {
    console.error('Create dispute error:', error);
    return res.status(500).json({ error: 'Failed to create dispute' });
  }
});

// PATCH /api/disputes/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolution } = req.body;

    if (!status || !['UNDER_REVIEW', 'RESOLVED', 'CLOSED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updateData: Record<string, any> = { status };
    if (resolution) updateData.resolution = resolution;

    // If resolved, update the task status back to COMPLETED
    if (status === 'RESOLVED') {
      const dispute = await db.dispute.findUnique({ where: { id } });
      if (dispute) {
        await db.task.update({ where: { id: dispute.taskId }, data: { status: 'COMPLETED' } });
      }
    }

    const dispute = await db.dispute.update({
      where: { id },
      data: updateData
    });

    return res.json(dispute);
  } catch (error) {
    console.error('Update dispute error:', error);
    return res.status(500).json({ error: 'Failed to update dispute' });
  }
});

export default router;
