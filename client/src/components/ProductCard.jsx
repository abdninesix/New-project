import { Link } from "react-router-dom";


const ProductCard = ({ product, viewMode }) => {
  const { title, price, image, desc } = product;

  return viewMode === "grid" ? (
    // Grid View Card
    <div className="bg-white rounded-lg shadow p-4 w-full sm:w-[250px] flex flex-col">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-blue-600 font-bold mb-1">{price}</p>
        <Link to="/products/product-details" className="w-fit cursor-pointer text-blue-500 font-semibold">
          View Details
        </Link>
      </div>
    </div>
  ) : (
    // List View Card
    <div className="bg-white rounded-lg shadow p-4 w-full flex gap-4">
      <img src={image} alt={title} className="w-48 h-32 object-cover rounded-md" />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-700 text-sm mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Desc:
            {desc}
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
          <span className="text-blue-600 font-bold">{price}</span>
          <span className="text-yellow-500">⭐⭐⭐⭐ 4.5</span>
          <span className="text-gray-500">(1234 orders)</span>
        </div>
        <Link to="/products/product-details" className="w-fit cursor-pointer text-blue-500 font-bold">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
