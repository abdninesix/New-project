const FilterSidebar = () => {
  return (
    <aside className="w-full lg:w-64 rounded-xl space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-lg mb-2">Category</h3>
        <ul className="space-y-1 text-sm">
          <li><label><input type="checkbox" className="mr-2" /> Phones</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Laptops</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Accessories</label></li>
        </ul>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-bold text-lg mb-2">Brand</h3>
        <ul className="space-y-1 text-sm">
          <li><label><input type="checkbox" className="mr-2" /> Apple</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Samsung</label></li>
          <li><label><input type="checkbox" className="mr-2" /> Dell</label></li>
        </ul>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="font-bold text-lg mb-2">Condition</h3>
        <ul className="space-y-1 text-sm">
          <li><label><input type="radio" name="condition" className="mr-2" /> New</label></li>
          <li><label><input type="radio" name="condition" className="mr-2" /> Used</label></li>
        </ul>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-bold text-lg mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          className="w-full"
        />
        <p className="text-sm mt-1">$0 - $1000</p>
      </div>
    </aside>
  );
};

export default FilterSidebar;
