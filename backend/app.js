import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes); // Prefixo para as rotas de usuários

// Conectando ao banco de dados
sequelize.sync()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => console.log('Erro ao conectar ao banco de dados:', err));
