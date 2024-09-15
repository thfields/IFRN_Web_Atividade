import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = require('./usuarios');
const Produtos = require('./produtos');

const Compras = sequelize.define('compras', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produtos,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,  // Inclui createdAt e updatedAt
  tableName: 'compras',  // Especificando o nome da tabela
});

module.exports = Compras;
