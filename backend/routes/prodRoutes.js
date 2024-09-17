import express from 'express';
import { 
  createProduto, 
  getAllProdutos, 
  getProdutoById, 
  updateProduto, 
  deleteProduto, 
  getProdutosByUsuario 
} from '../controllers/prodController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { productUpload } from '../middlewares/multerConfig.js';

const router = express.Router();

router.post('/produtos', verificarToken, productUpload.single('foto'), createProduto);
router.get('/produtos', verificarToken, getAllProdutos);
router.get('/produto/:id', verificarToken, getProdutoById);
router.get('/produtos/usuario/:usuario_id', verificarToken, getProdutosByUsuario);
router.put('/produto/:id', verificarToken, productUpload.single('foto'), updateProduto);
router.delete('/produto/:id', verificarToken, deleteProduto);

export default router;
