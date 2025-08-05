import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, viewMode }) => {
  const { _id, name, price, image, description, category, stock } = product;

  // --- GRID VIEW ---
  if (viewMode === "grid") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition p-4 w-full sm:w-[300px] md:w-[350px] flex flex-col">
        <img
          src={image}
          alt={name}
          className="w-full h-64 sm:h-72 object-cover rounded-md mb-3"
        />
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="text-lg font-semibold line-clamp-1">{name}</h2>
          <p className="text-gray-500 text-xs">
            Category: {category?.name || "N/A"} | Stock: {stock ?? 0}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
            <span className="text-xl font-bold">Rs.{price}</span>
            <span className="text-yellow-500">⭐⭐⭐⭐ 4.5</span>
            <span className="text-gray-500">(12K sold)</span>
          </div>

          <div className="flex justify-between mt-3 items-center">
            <Link
              to={`/products/${_id}`}
              className="hover:underline text-blue-500 font-semibold text-sm"
            >
              View Details
            </Link>
            <Heart className="cursor-pointer text-gray-600 hover:text-red-400" />
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW (Always Horizontal) ---
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition p-4 w-full flex items-start gap-4">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-32 object-cover rounded-md"
      />

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start gap-2">
          <h2 className="text-base sm:text-lg font-semibold line-clamp-1">{name}</h2>
          <Heart className="cursor-pointer text-gray-500 hover:text-red-400 shrink-0" />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-lg sm:text-xl font-semibold">Rs.{price}</span>
          <span className="text-yellow-500 text-sm">⭐⭐⭐⭐ 4.5</span>
          <span className="text-gray-500 text-xs">(12K sold)</span>
        </div>

        <p className="text-gray-700 text-xs sm:text-sm mt-1 line-clamp-2">
          {description || "No description available."}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Category: {category?.name || "N/A"} | Stock: {stock ?? 0}
        </p>

        <Link
          to={`/products/${_id}`}
          className="hover:underline text-blue-500 font-semibold mt-2 text-xs sm:text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
