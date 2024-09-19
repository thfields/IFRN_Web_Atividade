import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Função para lidar com o logout
  const handleLogout = () => {
    localStorage.removeItem('acessToken'); // Remove o token do localStorage
    localStorage.removeItem('id'); // Remove o ID do usuário
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">AnyList</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/produtos" className="hover:underline">Minha lista</Link></li>
            <li><Link to="/perfil" className="hover:underline">Perfil</Link></li>
            <li>
              <button onClick={handleLogout} className="hover:underline">
                Sair
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
