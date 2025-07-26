import { ChevronDown, Globe } from "lucide-react";

const MainNavbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between text-sm">
      {/* Left: All Category */}
      <button className="flex items-center gap-1 text-gray-700 font-medium hover:text-blue-600">
        <span className="text-base">📂</span>
        <span>All Category</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
        <button className="hover:text-blue-600">Hot Offers</button>
        <button className="hover:text-blue-600">Gift Boxes</button>
        <button className="hover:text-blue-600">Projects</button>
        <button className="hover:text-blue-600">Menu</button>
        <button className="hover:text-blue-600 flex items-end">Help<ChevronDown className="w-4 h-4" /></button>
      </div>

      {/* Right: Language & Ship To */}
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        {/* Language */}
        <button className="flex items-center gap-1 hover:text-blue-600">
          <Globe className="w-4 h-4" />
          <span>English</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Ship to */}
        <button className="flex items-center gap-1 hover:text-blue-600">
          <span>🇵🇰</span>
          <span>Ship to</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MainNavbar;
