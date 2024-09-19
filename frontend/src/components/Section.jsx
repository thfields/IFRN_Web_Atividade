const Section = () => {
  return (
    <section className="relative h-96 bg-blue-500 text-white flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}></div>
      <div className="container mx-auto z-10 text-center">
        <h2 className="text-4xl font-bold mb-4">Bem-vindo a sua AnyList</h2>
        <p className="text-lg mb-8">Facilita a criação, organização de listas de compras de forma simples e prática.</p>
      </div>
    </section>
  );
};

export default Section;
