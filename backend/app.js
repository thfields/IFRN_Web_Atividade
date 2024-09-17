import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import prodRoutes from './routes/prodRoutes.js';

// Obtém o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuração para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuração das rotas
app.use('/api', userRoutes); // Prefixo para as rotas de usuários
app.use('/api', prodRoutes); // Prefixo para as rotas de produtos

export default app;
