// controllers/authController.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Modelo de Usuário (você precisará criar um arquivo para armazenar usuários, como uma entidade)
import User from '../entities/user'; // Ajuste isso ao seu modelo

// Função para gerar token JWT
const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Rota de Registro de Usuário
export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    const token = generateToken(user.id, user.role);

    res.status(201).json({ message: 'Usuário registrado com sucesso', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar o usuário', error: err.message });
  }
};

// controllers/authController.ts (adicionar essa parte)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } }); // Supondo que você tenha o Sequelize ou TypeORM configurado

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = generateToken(user.id, user.role);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};

