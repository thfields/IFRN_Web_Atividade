import { useState, useEffect } from 'react';
import ProdutoService from '../services/apiProdutos';
import ProdModal from './ProdModal'; // Importa o modal de edição/criação

const BASE_URL = 'http://localhost:3000/';

const ListProd = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null); // Produto em edição ou null para criar
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  // Buscar produtos do usuário
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('acessToken');
        const usuarioId = localStorage.getItem('id');

        if (!usuarioId || !token) {
          throw new Error('Usuário não autenticado.');
        }

        const data = await ProdutoService.listarPorUsuario(usuarioId, token);
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Excluir produto
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('acessToken');
      await ProdutoService.excluir(productId, token);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      setError('Erro ao excluir produto');
    }
  };

  // Editar produto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true); // Abre o modal para edição
  };

  // Criar produto
  const handleCreateProduct = () => {
    setEditingProduct(null); // Modo de criação
    setIsModalOpen(true); // Abre o modal para criação
  };
  

  // Atualizar ou criar produto
  const handleUpdate = async (formData) => {
    try {
      const token = localStorage.getItem('acessToken');
      const usuarioId = localStorage.getItem('id');
  
      if (!usuarioId) {
        throw new Error('Usuário não autenticado.');
      }
  
      // Verifica se é criação ou atualização
      if (editingProduct) {
        // Atualiza produto existente
        await ProdutoService.atualizar(editingProduct.id, formData, token);
        setProducts(products.map(product =>
          product.id === editingProduct.id ? { ...product, ...editingProduct } : product
        ));
      } else {
        // Criar novo produto
        formData.append('usuario_id', usuarioId); // Adiciona o usuario_id ao formData
        const novoProduto = await ProdutoService.criar(formData, token);
        setProducts([...products, novoProduto]);
      }
  
      setEditingProduct(null);
      setIsModalOpen(false);
    } catch (error) {
      setError(editingProduct ? 'Erro ao atualizar produto' : 'Erro ao criar produto');
    }
  };
  
  
  

  const handleCloseModal = () => {
    setEditingProduct(null); // Limpa o estado de edição/criação
    setIsModalOpen(false); // Fecha o modal
  };

  if (isLoading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Meus produtos</h2>

        <div className="text-center mb-6">
          <button
            onClick={handleCreateProduct} // Abre o modal para criar novo produto
            className="bg-white text-blue-500 py-2 px-4 rounded-lg"
          >
            Adicionar Produto
          </button>
        </div>

        {/* Lista de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src={`${BASE_URL}${product.foto}`} 
                  alt={product.nome} 
                  className="w-full h-32 object-cover mb-4 rounded-md" 
                />
                <h3 className="text-xl font-semibold mb-2">{product.nome}</h3>
                <p className="text-gray-700">{product.descricao}</p>
                <p className="text-gray-700">{product.valor}</p>
                <p className="text-gray-700">{product.quantidade}</p>
                <div className="flex justify-between mt-4">
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleEdit(product)} // Abre o modal para edição
                  >
                    Editar
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleDelete(product.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>

        {/* Modal de Criação/Edição */}
        {isModalOpen && (
          <ProdModal
            product={editingProduct} // Passa o produto em edição ou null (para criação)
            onClose={handleCloseModal} // Fecha o modal
            onUpdate={handleUpdate} // Atualiza ou cria o produto
          />
        )}
      </div>
    </section>
  );
};

export default ListProd;
