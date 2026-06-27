import { Router, Response } from 'express';
import { db } from '../db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// GET /api/wallet
// Returns the user's current balance and transaction history
router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Fetch user with their transactions
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        balance: true,
        transactions: {
          include: {
            task: {
              select: {
                id: true,
                title: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      balance: user.balance,
      transactions: user.transactions,
    });
  } catch (error) {
    console.error('Fetch wallet error:', error);
    return res.status(500).json({ error: 'Failed to fetch wallet information' });
  }
});

// POST /api/wallet/deposit
// Simulates depositing funds into the user's wallet
router.post('/deposit', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { amount, idempotencyKey } = req.body;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid deposit amount' });
    }

    // Idempotency check
    if (idempotencyKey) {
      const existingTx = await db.transaction.findUnique({
        where: { idempotencyKey },
        include: { task: true }
      });
      if (existingTx) {
        return res.json({
          message: 'Deposit already processed (Idempotency triggered)',
          transaction: existingTx,
        });
      }
    }

    // Execute in a transaction
    const result = await db.$transaction(async (tx) => {
      // 1. Update user balance
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          balance: { increment: parsedAmount },
        },
      });

      // 2. Log transaction
      const transaction = await tx.transaction.create({
        data: {
          userId,
          type: 'DEPOSIT',
          amount: parsedAmount,
          status: 'COMPLETED',
          idempotencyKey: idempotencyKey || null,
        },
      });

      return { balance: updatedUser.balance, transaction };
    });

    return res.status(201).json({
      message: 'Deposit successful',
      balance: result.balance,
      transaction: result.transaction,
    });
  } catch (error) {
    console.error('Wallet deposit error:', error);
    return res.status(500).json({ error: 'Failed to process deposit' });
  }
});

// POST /api/wallet/withdraw
// Simulates withdrawing funds from the user's wallet
router.post('/withdraw', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { amount, idempotencyKey } = req.body;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid withdrawal amount' });
    }

    // Idempotency check
    if (idempotencyKey) {
      const existingTx = await db.transaction.findUnique({
        where: { idempotencyKey },
        include: { task: true }
      });
      if (existingTx) {
        return res.json({
          message: 'Withdrawal already processed (Idempotency triggered)',
          transaction: existingTx,
        });
      }
    }

    // Execute in a transaction
    const result = await db.$transaction(async (tx) => {
      // Fetch user to check balance
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { balance: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (user.balance < parsedAmount) {
        throw new Error('Insufficient balance for withdrawal');
      }

      // 1. Update user balance
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          balance: { decrement: parsedAmount },
        },
      });

      // 2. Log transaction
      const transaction = await tx.transaction.create({
        data: {
          userId,
          type: 'WITHDRAW',
          amount: parsedAmount,
          status: 'COMPLETED',
          idempotencyKey: idempotencyKey || null,
        },
      });

      return { balance: updatedUser.balance, transaction };
    });

    return res.status(201).json({
      message: 'Withdrawal successful',
      balance: result.balance,
      transaction: result.transaction,
    });
  } catch (error: any) {
    console.error('Wallet withdrawal error:', error);
    if (error.message === 'Insufficient balance for withdrawal' || error.message === 'User not found') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Failed to process withdrawal' });
  }
});

export default router;
