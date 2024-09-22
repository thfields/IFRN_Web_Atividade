import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UsuarioService from '../services/apiUsuarios'; // Serviços da API
import defaultProfilePic from '../assets/defaultProfile.jpg'; // Imagem de perfil padrão

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla o submenu
  const [userPhoto, setUserPhoto] = useState(null); // Foto do usuário
  const [userName, setUserName] = useState(''); // Nome do usuário

  // URL base para imagens (ajustando para remover '/api')
  const BASE_URL = 'http://localhost:3000'; 

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('acessToken'); // Remove o token do localStorage
    localStorage.removeItem('id'); // Remove o ID do usuário
    navigate('/'); // Redireciona para a página de login
  };

  // Função para carregar a foto e nome do usuário
  const loadUserData = async () => {
    const token = localStorage.getItem('acessToken');
    const userId = localStorage.getItem('id');
    if (token && userId) {
      try {
        const response = await UsuarioService.buscarPorId(userId, token);
        const userPhotoUrl = response.foto
          ? `${BASE_URL}/${response.foto}` // Constrói a URL completa removendo '/api'
          : defaultProfilePic; // Usa a imagem padrão se não houver foto
        setUserPhoto(userPhotoUrl);
        setUserName(response.nome); // Seta o nome do usuário
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AnyList</h1>

        {/* Avatar do usuário e submenu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none flex items-center"
          >
            <span className="ml-2 mr-2">{userName}</span>
            <img
              src={userPhoto}
              alt="Foto do usuário"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </button>

          {/* Submenu que aparece ao clicar na foto */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-10">
              <Link
                to="/produtos"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Minha lista
              </Link>
              <Link
                to="/perfil"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
