const express = require('express');
const { registerUser, login, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController.js');
const { verificarToken } = require('../middlewares/userMiddleware.js');

const router = express.Router();

router.post('/criar', registerUser);
router.post('/login', login);
router.get('/usuarios', verificarToken, getAllUsers);
router.get('/usuario/:id', verificarToken, getUserById);
router.put('/usuario/:id', verificarToken, updateUser);
router.delete('/usuario/:id', verificarToken, deleteUser);

module.exports = router;
