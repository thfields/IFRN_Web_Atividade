import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const loginMutation = useMutation(async () => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error('Login falhou');
    }

    const data = await response.json();
    return data.token; // Retorna o token JWT
  }, {
    onSuccess: (token) => {
      localStorage.setItem('token', token);
      setToken(token);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Senha" 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
      />
      <button type="submit" disabled={loginMutation.isLoading}>
        {loginMutation.isLoading ? 'Carregando...' : 'Login'}
      </button>
      {loginMutation.isError && <p>Erro ao fazer login</p>}
    </form>
  );
};

export default LoginForm;
