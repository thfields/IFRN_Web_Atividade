// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Supermercado Inteligente</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Sua lista</a></li>
            <li><a href="#" className="hover:underline">Sobre</a></li>
            <li><a href="#" className="hover:underline">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;