import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Validação de e-mail
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,  // Armazenando o caminho da imagem como STRING
    allowNull: true,         // Campo opcional
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,  // Usuário não é admin por padrão
  },
}, {
  timestamps: true,  // Inclui createdAt e updatedAt
  tableName: 'usuarios',  // Especificando o nome da tabela no banco de dados
});

export default User;
