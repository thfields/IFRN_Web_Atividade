// multerConfig.js
import multer from 'multer';
import path from 'path';

// Função para criar o armazenamento de arquivos
const createStorage = (folder) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folder}/`);  // Diretório para salvar os arquivos
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${Date.now()}${ext}`;
      cb(null, filename);  // Nome do arquivo
    },
  });
};

// Configuração de upload para usuários
const userUpload = multer({
  storage: createStorage('usuarios'),
  limits: { fileSize: 2 * 1024 * 1024 },  // Limite de 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Tipo de arquivo inválido.'));
  },
});

// Configuração de upload para produtos
const productUpload = multer({
  storage: createStorage('produtos'),
  limits: { fileSize: 2 * 1024 * 1024 },  // Limite de 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Tipo de arquivo inválido.'));
  },
});

export { userUpload, productUpload };
