const DealsGrid = () => {
    
  const products = Array(8).fill({
    title: "Wireless Earbuds",
    price: "$49.99",
    image: "https://via.placeholder.com/200x200?text=Product",
  });

  return (
    <section className="px-4 py-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-lg font-semibold mb-4">Flash Deals</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <div key={i} className="border p-3 rounded hover:shadow">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 text-sm">{product.title}</h3>
              <p className="font-bold text-blue-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsGrid;
