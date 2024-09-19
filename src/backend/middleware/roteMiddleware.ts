// middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Você não tem permissão para acessar esta rota.' });
    }
    next();
  };
};

export default authorizeRoles;

