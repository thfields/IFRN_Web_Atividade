import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Produtos = sequelize.define('produtos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foto: {
    type: DataTypes.STRING,  // Caminho para a imagem do produto
    allowNull: true,
  },
}, {
  timestamps: true,  // Inclui createdAt e updatedAt
  tableName: 'produtos',  // Especificando o nome da tabela
});

export default Produtos;
