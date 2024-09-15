import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
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

// Rota inicial
app.get('/', (req, res) => {
  res.send('ZapWave API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api', campaignRoutes);

createConnection()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => console.log('Database connection failed:', error));

