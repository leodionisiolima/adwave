// middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: string;
  role: string;
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const accessToken = token.split(' ')[1]; // "Bearer token"

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded; // Armazena os dados do usuário no request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authenticateToken;

