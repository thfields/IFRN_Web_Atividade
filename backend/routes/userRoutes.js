import express from 'express';
import { registerUser, login, logout, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { userUpload } from '../middlewares/multerConfig.js';

const router = express.Router();

router.post('/criar', userUpload.single('foto'), registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/usuarios', verificarToken, getAllUsers);
router.get('/usuario/:id', verificarToken, getUserById);
router.put('/usuario/:id', verificarToken, userUpload.single('foto'), updateUser);
router.delete('/usuario/:id', verificarToken, deleteUser);

export default router;
