const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('usuarios', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,  // Armazenando o caminho da imagem como STRING
    allowNull: true,       // Torna a coluna 'foto' opcional
  },
  perfil: {
    type: DataTypes.JSONB,  // Usando JSONB para armazenar informações adicionais do perfil
    allowNull: true,       // Torna o campo de perfil opcional
  },
}, {
  timestamps: true,  // Inclui createdAt e updatedAt
});

module.exports = User;
