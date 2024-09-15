import Produtos from '../models/produtos.js';

export const createProduto = async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    const produto = await Produtos.create({ nome, descricao });
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produtos.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProdutoById = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produtos.findByPk(id);
    if (!produto) {
      return res.status(404).json({ mensagemerro: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, foto, descricao } = req.body;

  try {
    const produto = await Produtos.findByPk(id);
    if (!produto) {
      return res.status(404).json({ mensagemerro: 'Produto não encontrado' });
    }

    await produto.update({ nome, foto, descricao });
    res.json({ mensagem: 'Produto atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produtos.findByPk(id);
    if (!produto) {
      return res.status(404).json({ mensagemerro: 'Produto não encontrado' });
    }

    await produto.destroy();
    res.json({ mensagem: 'Produto excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
