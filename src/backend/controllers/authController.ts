// controllers/authController.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from '/home/leo/Projects/adwave/src/backend/entities/user'; // Ajuste conforme necessário para importar a entidade correta

dotenv.config();

// Função para gerar token JWT
const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Caso a variável de ambiente não esteja definida, o padrão será 1h
  });
};

// Rota de Registro de Usuário
export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    // Verificar se o email já está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Este e-mail já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashing da senha
    const user = User.create({ name, email, password: hashedPassword, role }); // Criação do usuário
    await user.save(); // Salvar o usuário no banco de dados

    const token = generateToken(user.id, user.role); // Geração do token JWT

    res.status(201).json({ message: 'Usuário registrado com sucesso', token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar o usuário', error: err.message });
  }
};

// Rota de Login de Usuário
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } }); // Supondo que você esteja usando TypeORM

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Comparação de senha hash

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = generateToken(user.id, user.role); // Geração do token JWT

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
};
