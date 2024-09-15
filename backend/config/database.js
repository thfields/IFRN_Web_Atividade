import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('prova_backend', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
