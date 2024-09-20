import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressSanitizer from 'express-sanitizer';  // Importando o express-sanitizer
import campaignRoutes from './routes/campaignRoutes';
import { createConnection } from 'typeorm';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// Habilitar CORS
app.use(cors());

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Middleware do express-sanitizer
app.use(expressSanitizer());  // Adicionando o sanitizador globalmente

// Rota inicial
app.get('/', (req, res) => {
  res.send('AdWave API is running');
});

// Rotas de campanhas
app.use('/api', campaignRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Conexão com o banco de dados
createConnection()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => console.log('Database connection failed:', error));

