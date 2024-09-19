import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UsuarioService from '../services/apiUsuarios'; // Serviços da API ajustados
import { useNavigate } from 'react-router-dom'; // Para redirecionar após login

// Esquema de validação do formulário usando Zod
const schema = z.object({
  email: z.string().email('Email inválido').nonempty('O email é obrigatório'),
  senha: z.string().min(4, 'A senha precisa ter no mínimo 4 caracteres').nonempty('A senha é obrigatória'),
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres').optional(),
  photo: z.any().optional(),
});

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Alterna entre login e registro
  const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro para feedback
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate(); // Para redirecionar após login

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      setErrorMessage(''); // Limpa erros ao tentar submeter
  
      if (isRegistering) {
        // Registro de usuário
        const formData = new FormData();
        formData.append('nome', data.name); // Corrigido para 'nome'
        formData.append('email', data.email);
        formData.append('senha', data.senha); // Corrigido para 'senha'
  
        if (data.photo && data.photo[0]) {
          formData.append('foto', data.photo[0]); // Upload de foto
        }
  
        const response = await UsuarioService.criar(formData);
        console.log('Usuário registrado:', response);
        navigate('/produtos'); // Redireciona para /home após registro
      } else {
        // Login de usuário
        const credentials = { email: data.email, senha: data.senha }; // Corrigido para 'senha'
        console.log(credentials);
  
        const response = await UsuarioService.login(credentials.email, credentials.senha);
  
        console.log(response);
  
        if (response.acessToken) {
          localStorage.setItem('acessToken', response.acessToken); // Salvando o token no localStorage
          console.log('Token salvo:', response.acessToken);
          
          localStorage.setItem('id', response.id);
          navigate('/produtos'); // Redireciona para /home após login
        } else {
          setErrorMessage('Erro ao fazer login, token não retornado.');
        }
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setErrorMessage('Falha ao processar sua solicitação. Tente novamente.');
    } finally {
      setIsLoading(false); // Sempre desabilita o estado de carregamento
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header com os botões */}
      <div className="container mx-auto p-4 flex justify-end">
        <button
          className={`${
            !isRegistering ? 'bg-blue-600' : 'bg-blue-500'
          } text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mr-4`}
          onClick={() => setIsRegistering(false)}
          disabled={isLoading}
        >
          Entrar
        </button>
        <button
          className={`${
            isRegistering ? 'bg-blue-600' : 'bg-blue-500'
          } text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors`}
          onClick={() => setIsRegistering(true)}
          disabled={isLoading}
        >
          Cadastre-se
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 grid grid-cols-2 gap-4 items-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-blue-500">AnyList</h1>
          <p className="mt-4 text-gray-600">
            AnyList é uma ferramenta versátil para criar e organizar listas de compras.
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white p-8 rounded-lg shadow-lg min-h-[400px] max-h-[400px]">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isRegistering ? 'Cadastrar-se' : 'Entrar'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isRegistering && (
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
            )}

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
              <label htmlFor="senha" className="block text-gray-700">Senha</label>
              <input
                type="password"
                id="senha"
                {...register('senha')}
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                placeholder="Digite sua senha"
              />
              {errors.senha && <p className="text-red-500 text-sm mt-1">{errors.senha.message}</p>}
            </div>

            {isRegistering && (
              <div className="mb-4">
                <label htmlFor="photo" className="block text-gray-700">Foto</label>
                <input
                  type="file"
                  id="photo"
                  {...register('photo')}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors" disabled={isLoading}>
              {isRegistering ? 'Cadastrar' : 'Entrar'}
            </button>

            {isLoading && <p className="text-center mt-4">Carregando...</p>}
            {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
