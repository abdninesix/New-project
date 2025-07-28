import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import { LayoutGrid, List } from "lucide-react";
import Newsletter from "../components/Newsletter";

const dummyProducts = Array(14).fill({
    title: "Wireless Earbuds",
    price: "$49.99",
    desc: "High-quality wireless earbuds with noise cancellation.",
    image: "https://images.unsplash.com/photo-1722439667098-f32094e3b1d4?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
});

const ProductList = () => {
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
    const [sort, setSort] = useState("relevance");
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [viewMode, setViewMode] = useState("grid");

    const filteredProducts = showVerifiedOnly
        ? dummyProducts.filter((p) => p.isVerified)
        : dummyProducts;

    return (
        <>
            <div className="min-h-screen px-4 bg-sky-50 text-gray-900">
                <div className="mx-auto py-6">
                    <Breadcrumbs />

                    <div className="flex flex-col lg:flex-row gap-6 mt-6">
                        <FilterSidebar />

                        <div className="w-full flex flex-col gap-6">

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

                                    <div className="flex justify-end gap-2 mb-4">
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                        >
                                            <LayoutGrid className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={`p-2 rounded ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                        >
                                            <List className="w-5 h-5" />
                                        </button>
                                    </div>

                                </div>
                            </div>
                            {/* Product list */}
                            <div className={`${viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col gap-6"}`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Newsletter />
        </>
    );
};

export default ProductList;
