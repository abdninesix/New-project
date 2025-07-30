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
            })
            : products;


    return (
        <>
            <div className="min-h-screen px-4 bg-sky-50 text-gray-900">
                <div className="mx-auto py-6">
                    <Breadcrumbs />

                    <div className="flex flex-col lg:flex-row gap-6 mt-6">
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
                                    Showing <strong>{filteredProducts.length}</strong> products
                                </div>

                                <div className="flex items-center gap-4">
                                    <select
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="rounded-md text-sm"
                                    >
                                        <option value="relevance">Sort by: Relevance</option>
                                        <option value="latest">Sort by: Latest</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                    </select>

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
                            <div
                                className={`${viewMode === "grid"
                                        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                                        : "flex flex-col gap-6"
                                    }`}
                            >
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} viewMode={viewMode} />
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
