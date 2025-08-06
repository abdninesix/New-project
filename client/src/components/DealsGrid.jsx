import { useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const DealsGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const res = await API.get("/products");
        setProducts(res.data.slice(0, 8));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-6 bg-[#F7FAFC] mb-8">
      <div className="mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center sm:text-left">
          Recommended items
        </h2>

        {/* Loading State */}
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4 w-full flex flex-col"
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-md mb-2"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <h2 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">
                    Category: {product.category?.name || "N/A"} | Stock: {product.stock ?? 0}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm mt-2">
                    <span className="text-blue-600 font-bold">Rs.{product.price}</span>
                    <span className="text-yellow-500">⭐⭐⭐⭐ 4.5</span>
                    <span className="text-gray-500">(12K sold)</span>
                  </div>

                  <div className="flex justify-between mt-2 items-center">
                    <Link
                      to={`/products/${product._id}`}
                      className="w-fit hover:underline text-blue-500 font-semibold text-xs sm:text-sm"
                    >
                      View Details
                    </Link>
                    <Heart className="cursor-pointer text-gray-600 hover:text-red-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DealsGrid;
