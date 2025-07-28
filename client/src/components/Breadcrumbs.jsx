import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  return (
    <nav className="p-4 text-sm flex items-center space-x-1 text-gray-600 dark:text-gray-300">
      <span className="hover:underline cursor-pointer">Home</span>
      <ChevronRight className="w-4 h-4" />
      <span className="hover:underline cursor-pointer">Categories</span>
      <ChevronRight className="w-4 h-4" />
      <span className="font-semibold text-black dark:text-white">
        CategoryName
      </span>
    </nav>
  );
};

export default Breadcrumbs;
