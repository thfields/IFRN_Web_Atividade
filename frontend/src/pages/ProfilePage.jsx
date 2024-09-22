import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UsuarioService from '../services/apiUsuarios'; // Serviços da API ajustados
import { useNavigate } from 'react-router-dom'; // Para redirecionar após edição
import Header from '../components/Header';
import Footer from '../components/Footer';

// Esquema de validação do formulário usando Zod
const schema = z.object({
  email: z.string().email('Email inválido').nonempty('O email é obrigatório'),
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres').nonempty('O nome é obrigatório'),
  photo: z.any().optional(),
});

const ProfilePage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null); // Para armazenar os dados do usuário
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue, // Para popular os campos com dados existentes
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Função para carregar os dados do usuário
  const loadUserData = async () => {
    const token = localStorage.getItem('acessToken');
    const userId = localStorage.getItem('id');
    if (token && userId) {
      try {
        const response = await UsuarioService.buscarPorId(userId, token);
        setUserData(response); // Armazenar os dados do usuário
        // Preencher o formulário com os dados existentes
        setValue('email', response.email);
        setValue('name', response.nome);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const token = localStorage.getItem('acessToken');
    const userId = localStorage.getItem('id');

    try {
      setErrorMessage(''); // Limpa erros ao tentar submeter
      const formData = new FormData();
      formData.append('nome', data.name);
      formData.append('email', data.email);

      if (data.photo && data.photo[0]) {
        formData.append('foto', data.photo[0]);
      }

      await UsuarioService.atualizar(userId, formData, token);
      console.log('Usuário atualizado com sucesso.');
      navigate('/produtos'); // Redireciona após a edição
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      setErrorMessage('Falha ao atualizar o perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Editar Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nome</label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Digite seu nome"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              placeholder="Digite seu email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700">Foto de Perfil</label>
            <input
              type="file"
              id="photo"
              {...register('photo')}
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>

          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
