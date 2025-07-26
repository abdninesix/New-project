import { User, MessageCircle, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

const HeaderTop = () => {
  const [category, setCategory] = useState("all");

  return (
    <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between gap-4 text-sm">
      {/* Logo */}
      <div className="text-3xl font-extrabold text-blue-400 flex items-center gap-1">
        🛍️ <span>Brand</span>
      </div>

      {/* Search Bar + Category */}
      <div className="flex-1 flex items-center max-w-3xl border border-blue-500 rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-3 rounded-l-md focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-x border-gray-300 px-3 py-2 focus:outline-none"
        >
          <option value="all">All category</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home</option>
          <option value="fashion">Fashion</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700">
          Search
        </button>
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6 text-gray-700">
        <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </div>
        <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">Message</span>
        </div>
        <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <Heart className="w-5 h-5" />
          <span className="text-xs">Orders</span>
        </div>
        <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs">My cart</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
