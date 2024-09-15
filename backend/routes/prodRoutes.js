import express from 'express';
import { 
  createProduto, 
  getAllProdutos, 
  getProdutoById, 
  updateProduto, 
  deleteProduto 
} from '../controllers/prodController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/produtos', verificarToken, createProduto);
router.get('/produtos', verificarToken, getAllProdutos);
router.get('/produto/:id', verificarToken, getProdutoById);
router.put('/produto/:id', verificarToken, updateProduto);
router.delete('/produto/:id', verificarToken, deleteProduto);

export default router;
