import { ChevronDown, Globe, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <div className="md:px-8 lg:px-16 xl:px-32 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-sm">
      <div className="w-full flex justify-center md:justify-between items-center gap-4">
        {/* Left: All Category */}
        <button className="hidden md:flex items-center gap-1 text-gray-700 font-medium cursor-pointer hover:text-blue-600">
          <Menu />
          <span> All Category</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/products" className="hover:text-blue-600">All Products</Link>
          <button className="hover:text-blue-600">Hot Offers</button>
          <button className="hover:text-blue-600">Gift Boxes</button>
          <button className="hover:text-blue-600">Menu</button>
          <button className="hover:text-blue-600 flex items-end">Help<ChevronDown className="w-4 h-4" /></button>
        </div>

        {/* Right: Language & Ship To */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {/* Language */}
          <button className="flex items-center gap-1 hover:text-blue-600">
            <Globe className="w-4 h-4" />
            <span>English</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Ship to */}
          <button htmlFor="selector" className="flex items-center gap-1 hover:text-blue-600">
            <span>🇵🇰</span>
            <span>Ship to</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
