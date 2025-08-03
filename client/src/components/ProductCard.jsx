import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, viewMode }) => {
  const { name, price, image, description, category, stock } = product;

  // Grid View Card
  if (viewMode === "grid") {
    return (
      <div className="bg-white rounded-lg border border-gray-300 p-4 w-full sm:w-[250px] flex flex-col">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="text-lg font-semibold line-clamp-1">{name}</h2>
          <p className="text-gray-500 text-xs">
            Category: {category?.name || "N/A"} | Stock: {stock ?? 0}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
            <span className="text-blue-600 font-bold">Rs.{price}</span>
            <span className="text-yellow-500">⭐⭐⭐⭐ 4.5</span>
            <span className="text-gray-500">(12K sold)</span>
          </div>

          <div className="flex justify-between mt-2 items-center">
            <Link
              to={`/products/${product._id}`}
              className="w-fit hover:underline text-blue-500 font-semibold text-sm"
            >
              View Details
            </Link>
            <Heart className="cursor-pointer text-gray-600 hover:text-red-500" />
          </div>
        </div>
      </div>
    );
  }

  // List View Card
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full flex gap-4 transition">
      <img
        src={image}
        alt={name}
        className="w-48 h-32 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">{name}</h2>
          <Heart className="cursor-pointer text-gray-500 hover:fill-red-500" />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
          <span className="text-xl font-semibold">Rs.{price}</span>
          <span className="text-yellow-500">⭐⭐⭐⭐ 4.5</span>
          <span className="text-gray-500">(12K sold)</span>
        </div>
        <p className="text-gray-700 text-sm mt-1 line-clamp-2">
          {description || "No description available."}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          Category: {category?.name || "N/A"} | Stock: {stock ?? 0}
        </p>
        <Link
          to={`/products/${product._id}`}
          className="w-fit hover:underline text-blue-500 font-semibold mt-2 text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
