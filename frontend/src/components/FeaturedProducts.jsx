// src/components/FeaturedProducts.jsx

const products = [
  { id: 1, name: 'Produto 1', price: '$10', image: '/path/to/product1.jpg' },
  { id: 2, name: 'Produto 2', price: '$20', image: '/path/to/product2.jpg' },
  { id: 3, name: 'Produto 3', price: '$30', image: '/path/to/product3.jpg' },
];

const FeaturedProducts = () => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Produtos em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
