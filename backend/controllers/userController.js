import User from '../models/usuarios.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const secretWord = 'IFRN2@24';

function encriptarSenha(senha) {
  return crypto.createHash('sha256').update(senha + secretWord).digest('hex');
}

function gerarToken(payload) {
  return jwt.sign(payload, secretWord, { expiresIn: '2h' });
}

export const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  const foto = req.file ? req.file.path : null;  // Pega o caminho do arquivo

  try {
    const senhaCriptografada = encriptarSenha(senha);
    const user = await User.create({ nome, email, senha: senhaCriptografada, foto });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  const { email, senha } = req.body;
  const senhaCriptografada = encriptarSenha(senha);

  try {
    const user = await User.findOne({ where: { email, senha: senhaCriptografada } });
    if (!user) {
      return res.status(403).json({ mensagemerro: 'Usuário ou senha inválidos' });
    }

    const token = gerarToken({ id: user.id, nome: user.nome });
    res.json({ id:user.id ,acessToken: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  // Limpa o cookie do token JWT (ou destrói a sessão se estiver usando sessões)
  res.clearCookie('token', { httpOnly: true, secure: false });

  return res.json({ mensagem: 'Logout realizado com sucesso' });
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
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

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  const foto = req.file ? req.file.path : null;  // Pega o caminho do arquivo

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ mensagemerro: 'Usuário não encontrado' });
    }
    
    const updateData = { nome, email, senha: senha ? encriptarSenha(senha) : undefined,  foto: foto || usuario.foto, };
    await user.update(updateData);
    res.json({ mensagem: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
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
