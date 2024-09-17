import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './usuarios.js'; // Importar o modelo User

const Produtos = sequelize.define('Produto', {
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
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: true, // Pode ser nulo se não for obrigatório
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Pode ser nulo se não for obrigatório
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false, // Permite nulo se o produto não estiver associado a um usuário
  },
}, {
  timestamps: true,  // Inclui createdAt e updatedAt
  tableName: 'produtos',  // Especificando o nome da tabela
});

// Definindo o relacionamento
Produtos.belongsTo(User, { foreignKey: 'usuario_id', onDelete: 'SET NULL' });

export default Produtos;
