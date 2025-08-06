import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  return (
    <nav className="text-sm flex items-center space-x-1 text-gray-600">
      <span className="hover:underline cursor-pointer">Home</span>
      <ChevronRight className="w-4 h-4" />
      <span className="hover:underline cursor-pointer">Products</span>
      <ChevronRight className="w-4 h-4" />
      <span className="hover:underline cursor-pointer">Category</span>
      <ChevronRight className="w-4 h-4" />
      <span className="font-semibold text-black">
        Product
      </span>
    </nav>
  );
};

export default Breadcrumbs;
