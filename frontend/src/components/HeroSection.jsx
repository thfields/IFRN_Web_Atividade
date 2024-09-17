// src/components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-96 bg-blue-500 text-white flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}></div>
      <div className="container mx-auto z-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Bem-vindo ao Supermercado Inteligente</h2>
        <p className="text-lg mb-8">Encontre os melhores produtos com tecnologia de ponta.</p>
        <a href="#" className="bg-white text-blue-500 py-2 px-4 rounded-lg">Saiba Mais</a>
      </div>
    </section>
  );
};

export default HeroSection;
