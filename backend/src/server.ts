import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { requireGateway } from './middleware/auth';
import { validateEnv } from './utils/env';
import { errorHandler } from './middleware/errors';

// Import routes
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import statsRouter from './routes/stats';
import tasksRouter from './routes/tasks';
import bidsRouter from './routes/bids';
import deliverablesRouter from './routes/deliverables';
import disputesRouter from './routes/disputes';
import messagesRouter from './routes/messages';
import reviewsRouter from './routes/reviews';
import seedRouter from './routes/seed';
import uploadRouter from './routes/upload';
import onboardingRouter from './routes/onboarding';
import walletRouter from './routes/wallet';

dotenv.config();

// Run startup environment checks
validateEnv();

const app = express();

// Trust proxy header from gateway / proxy (e.g. Next.js proxy)
app.set('trust proxy', 1);

// Set security headers via Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow frontend to load static assets like uploads
}));

// Serve uploads folder statically
const uploadDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[BACKEND] ${req.method} ${req.path}`);
  next();
});

// Global API Gateway enforcement
app.use(requireGateway);

// Rate limiting setups
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60, // limit each IP to 60 auth requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts, please try again later.' },
});

// Apply rate limits
app.use('/api/', globalLimiter);
app.use('/api/auth/', authLimiter);

// Register routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/stats', statsRouter);
app.use('/api/seed', seedRouter);
app.use('/api/upload', uploadRouter);

// Authenticated routes
app.use('/api/onboarding', onboardingRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/bids', bidsRouter);
app.use('/api/deliverables', deliverablesRouter);
app.use('/api/disputes', disputesRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/wallet', walletRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global Error Handler Middleware (MUST be registered after all route handlers)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER] Express backend running on http://localhost:${PORT}`);
});

