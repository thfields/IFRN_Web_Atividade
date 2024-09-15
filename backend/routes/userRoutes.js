import express from 'express';
import { registerUser, login, logout, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/criar', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/usuarios', verificarToken, getAllUsers);
router.get('/usuario/:id', verificarToken, getUserById);
router.put('/usuario/:id', verificarToken, updateUser);
router.delete('/usuario/:id', verificarToken, deleteUser);

export default router;
