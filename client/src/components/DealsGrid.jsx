const DealsGrid = () => {
    
  const products = Array(8).fill({
    title: "Wireless Earbuds",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1722439667098-f32094e3b1d4?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  return (
    <section className="px-4 py-6 bg-white">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Flash Deals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <div key={i} className="bg-gray-100 text-left rounded hover:shadow">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="ml-2 mt-2 text-sm">{product.title}</h3>
              <p className="ml-2 font-bold text-blue-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsGrid;
