const User = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretWord = 'IFRN2@24';

function encriptarSenha(senha) {
  return crypto.createHash('sha256').update(senha + secretWord).digest('hex');
}

function gerarToken(payload) {
  return jwt.sign(payload, secretWord, { expiresIn: '2h' });
}

exports.registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaCriptografada = encriptarSenha(senha);

  try {
    const user = await User.create({ nome, email, senha: senhaCriptografada });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const senhaCriptografada = encriptarSenha(senha);

  try {
    const user = await User.findOne({ where: { email, senha: senhaCriptografada } });
    if (!user) {
      return res.status(403).json({ mensagemerro: 'Usuário ou senha inválidos' });
    }
    
    const token = gerarToken({ id: user.id, nome: user.nome });
    res.json({ acessToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ mensagemerro: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, foto, perfil } = req.body;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ mensagemerro: 'Usuário não encontrado' });
      }
  
      // Atualiza apenas os campos fornecidos
      const updateData = {};
      if (nome) updateData.nome = nome;
      if (email) updateData.email = email;
      if (senha) updateData.senha = encriptarSenha(senha);  // Supondo que você tenha uma função encriptarSenha
      if (foto) updateData.foto = foto;
      if (perfil) updateData.perfil = perfil;
  
      await user.update(updateData);
  
      res.json({ mensagem: 'Usuário atualizado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ mensagemerro: 'Usuário não encontrado' });
    }

    await user.destroy();
    res.json({ mensagem: 'Usuário excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
