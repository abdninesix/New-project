import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  return (
    <nav className="py-4 text-sm flex items-center space-x-1 text-gray-600">
      <span className="hover:underline cursor-pointer">Home</span>
      <ChevronRight className="w-4 h-4" />
      <span className="hover:underline cursor-pointer">Categories</span>
      <ChevronRight className="w-4 h-4" />
      <span className="font-semibold text-black">
        CategoryName
      </span>
    </nav>
  );
};

export default Breadcrumbs;
