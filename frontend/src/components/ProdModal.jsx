import { useState, useEffect } from 'react';

const ProdModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    valor: '',
    quantidade: '',
    foto: null,
  });

  // Preenche o formulário se for edição
  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome,
        descricao: product.descricao,
        valor: product.valor,
        quantidade: product.quantidade,
        foto: null, // A foto será atualizada apenas se o usuário fizer upload de uma nova
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      foto: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.descricao || !formData.valor || !formData.quantidade) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('descricao', formData.descricao);
    formDataToSend.append('valor', formData.valor);
    formDataToSend.append('quantidade', formData.quantidade);
    
    if (formData.foto) {
      formDataToSend.append('foto', formData.foto);
    }

    // Verifique os dados no FormData
  for (let pair of formDataToSend.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
    
    onUpdate(formDataToSend); // Chama a função de atualização ou criação com o formData
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          {product ? 'Editar Produto' : 'Adicionar Novo Produto'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Descrição:</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Valor:</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Quantidade:</label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Foto (opcional):</label>
            <input
              type="file"
              name="foto"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {product ? 'Atualizar Produto' : 'Adicionar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdModal;
