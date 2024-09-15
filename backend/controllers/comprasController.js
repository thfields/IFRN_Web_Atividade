import Compras from '../models/compras.js';
import Produtos from '../models/produtos.js';
import User from '../models/usuarios.js';

export const createCompra = async (req, res) => {
  const { usuario_id, produto_id } = req.body;

  try {
    const produto = await Produtos.findByPk(produto_id);
    if (!produto) {
      return res.status(404).json({ mensagemerro: 'Produto não encontrado' });
    }

    const compra = await Compras.create({ usuario_id, produto_id });
    res.status(201).json(compra);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCompras = async (req, res) => {
  try {
    const compras = await Compras.findAll({
      include: [
        { model: User, attributes: ['nome', 'email'] },
        { model: Produtos, attributes: ['nome', 'foto'] },
      ],
    });
    res.json(compras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompraById = async (req, res) => {
  const { id } = req.params;

  try {
    const compra = await Compras.findByPk(id, {
      include: [
        { model: User, attributes: ['nome', 'email'] },
        { model: Produtos, attributes: ['nome', 'foto'] },
      ],
    });

    if (!compra) {
      return res.status(404).json({ mensagemerro: 'Compra não encontrada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

