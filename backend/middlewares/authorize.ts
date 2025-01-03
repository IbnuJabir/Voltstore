// middlewares/authorize.ts
import { Request, Response, NextFunction } from 'express';

const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

export { authorizeAdmin };
