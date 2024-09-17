// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Supermercado Inteligente. Todos os direitos reservados.</p>
        <div className="mt-2">
          <a href="#" className="text-gray-400 hover:underline">Privacidade</a> | 
          <a href="#" className="text-gray-400 hover:underline">Termos de Serviço</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
