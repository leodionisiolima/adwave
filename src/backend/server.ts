import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressSanitizer from 'express-sanitizer'; // Importando o express-sanitizer
import campaignRoutes from './routes/campaignRoutes';

dotenv.config(); // Carrega as variáveis de ambiente

const app = express();
const port = process.env.PORT || 3000;

// Configuração do DataSource para conectar ao banco de dados
const AppDataSource = new DataSource({
  type: 'postgres', // ou qualquer outro banco que você esteja usando (mysql, sqlite, etc.)
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entities/*.ts'], // Adapte o caminho para as entidades no seu projeto
  synchronize: true, // Definir para `false` em produção para evitar sincronizações automáticas
});

// Middleware de segurança
app.use(helmet());

// Habilitar CORS
app.use(cors());

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Middleware do express-sanitizer
app.use(expressSanitizer()); // Adicionando o sanitizador globalmente

// Rota inicial
app.get('/', (req, res) => {
  res.send('AdWave API is running');
});

// Rotas de campanhas
app.use('/api', campaignRoutes);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Conexão com o banco de dados usando DataSource
AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
