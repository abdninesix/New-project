import { useState, useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import { LayoutGrid, List } from "lucide-react";
import Newsletter from "../components/Newsletter";
import API from "../api/axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sort, setSort] = useState("relevance");
    const [viewMode, setViewMode] = useState("grid");
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get("/products");
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, []);

    // Filter products by selected categories
    const filteredProducts =
        selectedCategories.length > 0
            ? products.filter((p) => {
                const categoryId =
                    typeof p.category === "object" ? p.category._id : p.category;
                return selectedCategories.includes(categoryId?.toString());
            }) : products;

    const itemsPerPage = viewMode === "grid" ? 9 : 6;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Calculate paginated products
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <>
            <div className="min-h-screen bg-[#F7FAFC] text-gray-900 px-4 md:px-8 lg:px-16 xl:px-32 duration-200">
                <div className="mx-auto py-6">
                    <Breadcrumbs />

                    <div className="flex flex-col lg:flex-row gap-6 mt-8 mb-8">
                        {/* Sidebar with callback */}
                        <FilterSidebar
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                        />

                        {/* Main Content */}
                        <div className="w-full flex flex-col gap-6">
                            {/* Sort & Controls */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-2 border border-gray-300 rounded-lg bg-white">
                                <div className="text-gray-700 text-sm">
                                    Showing <strong>{paginatedProducts.length}</strong> out of <strong>{filteredProducts.length}</strong> products
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={verifiedOnly}
                                            onChange={() => setVerifiedOnly(!verifiedOnly)}
                                            className="accent-blue-500"
                                        />
                                        Verified Only
                                    </label>

                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="rounded-md text-sm px-3 py-1 outline-none border border-gray-300"
                                    >
                                        <option value="relevance">Sort by: Relevance</option>
                                        <option value="latest">Sort by: Latest</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>

                                    <div className="flex gap-2">
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
                            <div
                                className={`${viewMode === "grid"
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                                    : "flex flex-col gap-6"
                                    }`}
                            >
                                {paginatedProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} viewMode={viewMode} />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Pagination component */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer disabled:hidden"
                        >
                            {"<"}
                        </button>

                        <span className="px-4 py-2">
                            {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 rounded-full cursor-pointer disabled:hidden"
                        >
                            {">"}
                        </button>
                    </div>

                </div>
            </div>
            <Newsletter />
        </>
    );
};

export default ProductList;
