import { useState, useEffect } from "react";
import API from "../api/axios";

const FilterSidebar = ({ selectedCategories, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

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
    <aside className="w-full lg:w-64 rounded-xl space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-lg mb-2">Category</h3>
        <ul className="space-y-1 text-sm">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat._id}>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedCategories.includes(cat._id)}
                    onChange={() => handleCheckboxChange(cat._id)}
                  /> {cat.name}
                </label>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-sm">Loading...</li>
          )}
        </ul>
      </div>
      <hr className="border-gray-300" />

      {/* Brand Filter (Static for now) */}
      <div>
        <h3 className="font-bold text-lg mb-2">Brand</h3>
        <ul className="space-y-1 text-sm">
          <li><label><input type="checkbox" className="mr-2" /> Samsung</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Apple</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Huawei</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Poco</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Lenovo</label></li>
        </ul>
        <p className="text-blue-500 text-sm cursor-pointer mt-2">See all</p>
      </div>
      <hr className="border-gray-300" />

      {/* Features*/}
      <div>
        <h3 className="font-bold text-lg mb-2">Brand</h3>
        <ul className="space-y-1 text-sm">
          <li><label><input type="checkbox" className="mr-2" /> Metallic</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Plastic cover</label></li>
          <li><label><input type="checkbox" className="mr-2" /> 8GB RAM</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Super power</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Large memory</label></li>
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
          className="w-full accent-blue-500"
        />
        <p className="text-sm mt-1">$0 - $1000</p>
      </div>
      <hr className="border-gray-300" />

      {/* Condition Filter */}
      <div>
        <h3 className="font-bold text-lg mb-2">Condition</h3>
        <ul className="space-y-1 text-sm">
          <li><label><input type="radio" name="condition" className="mr-2" /> Any</label></li>
          <li><label><input type="radio" name="condition" className="mr-2" /> Refurbished</label></li>
          <li><label><input type="radio" name="condition" className="mr-2" /> Brand new</label></li>
          <li><label><input type="radio" name="condition" className="mr-2" /> Old items</label></li>
        </ul>
        <p className="text-blue-500 text-sm cursor-pointer mt-2">See all</p>
      </div>
      <hr className="border-gray-300" />
    </aside>
  );
};

export default FilterSidebar;
