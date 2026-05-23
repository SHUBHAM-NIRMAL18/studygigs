import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requireGateway, requireAuth } from './middleware/auth';

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

dotenv.config();

const app = express();
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

// Register routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/stats', statsRouter);
app.use('/api/seed', seedRouter);

// Authenticated routes
app.use('/api/tasks', tasksRouter);
app.use('/api/bids', bidsRouter);
app.use('/api/deliverables', deliverablesRouter);
app.use('/api/disputes', disputesRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/reviews', reviewsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`[SERVER] Express backend running on http://localhost:${PORT}`);
});
