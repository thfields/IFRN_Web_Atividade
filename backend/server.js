import sequelize from './config/database.js';
import app from './app.js';

const port = 3000;

// Conectando ao banco de dados e iniciando o servidor
sequelize.sync()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso.');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => console.log('Erro ao conectar ao banco de dados:', err));
