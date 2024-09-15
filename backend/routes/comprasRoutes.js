import express from 'express';
import { 
  createCompra, 
  getAllCompras, 
  getCompraById, 
  updateCompra, 
  deleteCompra 
} from '../controllers/comprasController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/compras', verificarToken, createCompra);
router.get('/compras', verificarToken, getAllCompras);
router.get('/compra/:id', verificarToken, getCompraById);
router.put('/compra/:id', verificarToken, updateCompra);


export default router;
