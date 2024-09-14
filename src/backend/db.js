// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const pool = new Pool({
  user: process.env.DB_USER,      // Usuário do banco de dados
  host: process.env.DB_HOST,      // Host do banco de dados
  database: process.env.DB_NAME,  // Nome do banco de dados
  password: process.env.DB_PASSWORD,  // Senha do banco de dados
  port: process.env.DB_PORT,      // Porta do banco de dados
});

module.exports = pool;

