import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '../db';

const router = Router();

// 1. Authorize handler called by NextAuth credentials provider
router.post('/authorize', async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await db.user.findFirst({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({ error: 'No account found with this email' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      onboardingCompleted: user.onboardingCompleted,
    });
  } catch (error) {
    console.error('Authorize error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (!['STUDENT', 'SOLVER'].includes(role || 'STUDENT')) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail }
    });
    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: role || 'STUDENT',
        avatar: role === 'SOLVER' ? '🧑‍💻' : '👩‍🎓',
        bio: role === 'SOLVER' ? 'Qualified solver ready to help' : 'Student looking for academic assistance',
      }
    });

    return res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      onboardingCompleted: false,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }
});

// 3. Forgot Password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Avoid email enumeration
      return res.json({ message: 'If an account exists, a reset link has been sent' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry
      }
    });

    // Mock sending email
    console.log('---------------------------------------------------------');
    console.log(`[AUTH] RESET REQUEST FOR: ${email}`);
    console.log(`[AUTH] TOKEN: ${token}`);
    console.log(`[AUTH] LINK: http://localhost:3000/reset-password?token=${token}`);
    console.log('---------------------------------------------------------');

    return res.json({ message: 'Reset link sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// 4. Reset Password endpoint
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' });
    }

    const user = await db.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
