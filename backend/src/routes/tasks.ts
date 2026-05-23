import { Router } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const academicLevel = req.query.academicLevel as string | undefined;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const posterId = req.query.posterId as string | undefined;
    const sortBy = (req.query.sortBy as string) || 'newest';
    const page = parseInt((req.query.page as string) || '1');
    const limit = parseInt((req.query.limit as string) || '20');
    const skip = (page - 1) * limit;

    const where: Record<string, any> = {};
    if (category) where.category = category;
    if (academicLevel) where.academicLevel = academicLevel;
    if (status) where.status = status;
    if (posterId) where.posterId = posterId;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }

    const orderBy: Record<string, string> = {};
    switch (sortBy) {
      case 'budget_high':
        orderBy.budgetMax = 'desc';
        break;
      case 'budget_low':
        orderBy.budgetMin = 'asc';
        break;
      case 'deadline':
        orderBy.deadline = 'asc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }

    const [tasks, total] = await Promise.all([
      db.task.findMany({
        where,
        include: {
          poster: { select: { id: true, name: true, avatar: true, rating: true } },
          bids: { select: { id: true, proposedPrice: true, status: true } },
          _count: { select: { bids: true, messages: true } }
        },
        orderBy,
        skip,
        take: limit,
      }),
      db.task.count({ where })
    ]);

    return res.json({
      tasks,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks
router.post('/', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { title, description, category, academicLevel, budgetMin, budgetMax, deadline, attachments } = req.body;
    const posterId = req.user!.id;

    if (!title || !description || !category || !academicLevel || !budgetMin || !budgetMax || !deadline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let attachmentsStr: string | null = null;
    if (attachments) {
      attachmentsStr = typeof attachments === 'string' ? attachments : JSON.stringify(attachments);
    }

    const task = await db.task.create({
      data: {
        posterId,
        title,
        description,
        category,
        academicLevel,
        budgetMin: parseFloat(budgetMin),
        budgetMax: parseFloat(budgetMax),
        deadline: new Date(deadline),
        platformFee: 0.12,
        attachments: attachmentsStr
      },
      include: {
        poster: { select: { id: true, name: true, avatar: true, rating: true } },
        bids: true
      }
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id as string;
    const requesterId = req.headers['x-user-id'] as string | undefined;
    const requesterRole = req.headers['x-user-role'] as string | undefined;

    const task = await db.task.findUnique({
      where: { id },
      include: {
        poster: { select: { id: true, name: true, avatar: true, rating: true, bio: true, completedTasks: true } },
        bids: {
          include: { solver: { select: { id: true, name: true, avatar: true, rating: true, completedTasks: true, onTimeRate: true } } },
          orderBy: { createdAt: 'desc' }
        },
        deliverables: { include: { solver: { select: { id: true, name: true, avatar: true } } }, orderBy: { version: 'desc' } },
        reviews: { include: { reviewer: { select: { id: true, name: true, avatar: true } }, reviewee: { select: { id: true, name: true, avatar: true } } } },
        disputes: true,
        messages: { include: { sender: { select: { id: true, name: true, avatar: true } } }, orderBy: { createdAt: 'asc' } }
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const posterId = task.posterId;
    const acceptedBid = task.bids.find(b => b.status === 'ACCEPTED');

    // Confidential bidding filter
    let filteredBids = task.bids;
    if (requesterRole !== 'ADMIN' && posterId !== requesterId) {
      filteredBids = task.bids.filter(bid => 
        bid.solverId === requesterId || bid.status === 'ACCEPTED'
      );
    }

    // Private chat visibility filter
    const isParticipant = 
      requesterRole === 'ADMIN' ||
      posterId === requesterId ||
      (acceptedBid && acceptedBid.solverId === requesterId);

    const filteredMessages = isParticipant ? task.messages : [];

    const responseTask = {
      ...task,
      bids: filteredBids,
      messages: filteredMessages
    };

    return res.json(responseTask);
  } catch (error) {
    console.error('Get task error:', error);
    return res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// PATCH /api/tasks/:id
router.patch('/:id', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const id = req.params.id as string;
    const { status, acceptedBidId } = req.body;

    // Check ownership
    const existingTask = await db.task.findUnique({ where: { id } });
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (existingTask.posterId !== req.user!.id && req.user!.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You do not own this task' });
    }

    const updateData: Record<string, any> = {};
    if (status) updateData.status = status;

    if (acceptedBidId) {
      updateData.acceptedBidId = acceptedBidId;
      updateData.status = 'IN_PROGRESS';

      // Accept the winning bid
      await db.bid.update({ where: { id: acceptedBidId }, data: { status: 'ACCEPTED' } });
      // Reject all other pending bids for this task
      await db.bid.updateMany({
        where: { taskId: id, status: 'PENDING', id: { not: acceptedBidId } },
        data: { status: 'REJECTED' }
      });
    }

    const task = await db.task.update({
      where: { id },
      data: updateData,
      include: {
        poster: { select: { id: true, name: true, avatar: true } },
        bids: { include: { solver: { select: { id: true, name: true, avatar: true } } } }
      }
    });

    return res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    return res.status(500).json({ error: 'Failed to update task' });
  }
});

export default router;
