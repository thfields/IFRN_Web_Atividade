import jwt from 'jsonwebtoken';
const secretWord = 'IFRN2@24';

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', ''); 

  if (!token) {
    return res.status(401).json({ mensagemerro: 'Token não fornecido. Faça login.' });
  }

  jwt.verify(token, secretWord, (error, decoded) => {
    if (error) {
      return res.status(403).json({ mensagemerro: 'Token inválido. Faça login novamente.' });
    }

    req.user = decoded; // Salva o usuário decodificado no request
    next();
  });
};
