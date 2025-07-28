import { useState } from "react";

const ProductToolbar = () => {
  const [sort, setSort] = useState("relevance");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border border-gray-300 rounded-lg bg-white">
      <div className="text-gray-700 text-sm">
        Showing <strong>1-20</strong> of <strong>1480</strong> results
      </div>

      <div className="flex items-center gap-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-1 rounded-md text-sm"
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="latest">Sort by: Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={() => setVerifiedOnly(!verifiedOnly)}
            className="accent-green-600"
          />
          Verified Only
        </label>
      </div>
    </div>
  );
};

export default ProductToolbar;
