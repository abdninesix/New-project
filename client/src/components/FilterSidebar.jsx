import { useState, useEffect } from "react";
import API from "../api/axios";
import { SlidersHorizontal } from "lucide-react";

const FilterSidebar = ({ selectedCategories, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Mobile accordion toggle

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories"); // expects [{_id, name}]
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (categoryId) => {
    let updated;
    if (selectedCategories.includes(categoryId)) {
      updated = selectedCategories.filter((id) => id !== categoryId);
    } else {
      updated = [...selectedCategories, categoryId];
    }
    onCategoryChange(updated);
  };

  return (
    <div className="w-full lg:w-64">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`rounded-xl space-y-6 transition-all duration-300 overflow-hidden 
        ${isOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"}`}
      >
        {/* Category Filter */}
        <div>
          <h3 className="font-bold text-lg mb-2">Category</h3>
          <ul className="space-y-1 text-sm">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li key={cat._id}>
                  <label className="flex items-center cursor-pointer hover:text-blue-600">
                    <input
                      type="checkbox"
                      className="mr-2 accent-blue-600"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => handleCheckboxChange(cat._id)}
                    />{" "}
                    {cat.name}
                  </label>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">Loading...</li>
            )}
          </ul>
        </div>
        <hr className="border-gray-300" />

        {/* Brand Filter */}
        <div>
          <h3 className="font-bold text-lg mb-2">Brand</h3>
          <ul className="space-y-1 text-sm">
            {["Samsung", "Apple", "Huawei", "Poco", "Lenovo"].map((brand) => (
              <li key={brand}>
                <label className="flex items-center cursor-pointer hover:text-blue-600">
                  <input type="checkbox" className="mr-2 accent-blue-600" /> {brand}
                </label>
              </li>
            ))}
          </ul>
          <p className="text-blue-500 text-sm cursor-pointer mt-2">See all</p>
        </div>
        <hr className="border-gray-300" />

        {/* Features */}
        <div>
          <h3 className="font-bold text-lg mb-2">Features</h3>
          <ul className="space-y-1 text-sm">
            {["Metallic", "Plastic cover", "8GB RAM", "Super power", "Large memory"].map((feature) => (
              <li key={feature}>
                <label className="flex items-center cursor-pointer hover:text-blue-600">
                  <input type="checkbox" className="mr-2 accent-blue-600" /> {feature}
                </label>
              </li>
            ))}
          </ul>
          <p className="text-blue-500 text-sm cursor-pointer mt-2">See all</p>
        </div>
        <hr className="border-gray-300" />

        {/* Price Filter */}
        <div>
          <h3 className="font-bold text-lg mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="1000"
            className="w-full accent-blue-600"
          />
          <p className="text-sm mt-1">$0 - $1000</p>
        </div>
        <hr className="border-gray-300" />

        {/* Condition Filter */}
        <div>
          <h3 className="font-bold text-lg mb-2">Condition</h3>
          <ul className="space-y-1 text-sm">
            {["Any", "Refurbished", "Brand new", "Old items"].map((condition) => (
              <li key={condition}>
                <label className="flex items-center cursor-pointer hover:text-blue-600">
                  <input type="radio" name="condition" className="mr-2 accent-blue-600" /> {condition}
                </label>
              </li>
            ))}
          </ul>
          <p className="text-blue-500 text-sm cursor-pointer mt-2">See all</p>
        </div>
        <hr className="border-gray-300" />
      </aside>
    </div>
  );
};

export default FilterSidebar;
