import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export function requireGateway(req: Request, res: Response, next: NextFunction) {
  const gatewaySecret = req.headers['x-gateway-secret'];
  const expectedSecret = process.env.GATEWAY_SECRET || 'studygig-gateway-secret';

  if (gatewaySecret !== expectedSecret) {
    return res.status(403).json({ error: 'Forbidden: Direct access is not allowed' });
  }
  next();
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'];
  const userEmail = req.headers['x-user-email'];

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: User is not authenticated' });
  }

  req.user = {
    id: userId as string,
    role: (userRole as string) || 'STUDENT',
    email: (userEmail as string) || '',
  };

  next();
}
