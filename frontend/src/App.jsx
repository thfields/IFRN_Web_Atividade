import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProdPage from './pages/ProdPage';
import ProfilePage from './pages/ProfilePage';

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('acessToken'); // Verifica se o token está armazenado
};

// Componente de rota protegida
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota da página de login */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Rota protegida para a ProdPage */}
        <Route path="/produtos" element={<ProtectedRoute element={<ProdPage />} />} />
        <Route path="/perfil" element={<ProtectedRoute element={<ProfilePage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
