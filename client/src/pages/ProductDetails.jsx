import Breadcrumbs from "../components/Breadcrumbs";
import PromotionBanner from "../components/PromotionBanner";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import DealsGrid from "../components/DealsGrid";
import { toast } from "react-toastify";
import { CheckSquare, Globe, PinIcon } from "lucide-react";

const tabs = ["Description", "Reviews", "Shipping", "About Seller"];

const ProductDetails = () => {
    const { id } = useParams(); // product ID from route
    const [activeTab, setActiveTab] = useState("Description");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch single product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    // Handle Add to Cart
    const handleAddToCart = () => {
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product is already in cart
        const existing = cart.find((item) => item._id === product._id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`Item added to cart!`);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Description":
                return <p className="text-gray-700">{product?.description || "No description available."}</p>;
            case "Reviews":
                return <p className="text-gray-700">User reviews will be displayed here.</p>;
            case "Shipping":
                return <p className="text-gray-700">Shipping details, methods and times will go here.</p>;
            case "About Seller":
                return <p className="text-gray-700">Information about the seller.</p>;
            default:
                return null;
        }
    };

    if (loading) return <div className="p-10 text-center">Loading product...</div>;
    if (!product) return <div className="p-10 text-center text-red-500">Product not found.</div>;

    return (
        <div className="bg-[#F7FAFC] text-gray-900 pb-8 px-4 md:px-8 lg:px-16 xl:px-32">
            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Main Product Section */}
            <div className="bg-white grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-lg border border-gray-300">
                {/* Left: Product Info */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    {/* Product Image */}
                    <div className="p-4 flex flex-col justify-center items-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-96 object-cover"
                        />
                        <div className="flex gap-2 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    src={product.image}
                                    alt="thumb"
                                    className="border border-gray-300 size-17 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-4">
                        <h1 className="text-xl font-semibold">{product.name}</h1>
                        <div className={`${product.stock > 0 ? "text-green-600" : "text-red-600"} font-medium`}>
                            {product.stock > 0 ? "In stock" : "Out of stock"}
                        </div>
                        <div className="text-orange-600 font-bold text-xl">Rs.{product.price}</div>
                        <div className="text-yellow-500">⭐⭐⭐⭐ 4.5</div>
                        <div className="text-gray-500">(12K sold)</div>
                        <div><strong>Stock:</strong> {product.stock || "Out of stock"} left</div>
                        <div><strong>Warranty:</strong> 1 year</div>
                        <div><strong>Category:</strong> {product.category?.name || "N/A"}</div>

                        {/* Add to Cart Button */}
                        {product.stock > 0 && (
                            <button
                                onClick={handleAddToCart}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full cursor-pointer"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>

                {/* Right: Supplier Info */}
                <div className="lg:col-span-3 h-2/3 bg-white p-4 rounded-lg border border-gray-300 mt-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-sky-50 size-10 text-2xl text-center rounded">R</div>
                        <p className="font-semibold">Supplier Trading LLC</p>
                    </div>
                    <div className="text-gray-400 space-y-2 mt-5">
                        <p className="flex items-center gap-4"><PinIcon />Germany, Berlin</p>
                        <p className="flex items-center gap-4"> <CheckSquare />Verified Seller</p>
                        <p className="flex items-center gap-4"><Globe />Worldwide Shipping</p>
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer">
                        Send Inquiry
                    </button>
                    <button className="mt-4 bg-white hover:bg-gray-50 border border-gray-300 text-blue-500 px-4 py-2 rounded w-full cursor-pointer">
                        Seller's profile
                    </button>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="grid grid-cols-4 gap-8 mt-8">
                <div className="h-full col-span-3 p-4 bg-white rounded-lg border border-gray-300">
                    <div>
                        <div className="flex gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-2 text-sm md:text-base font-medium ${activeTab === tab
                                        ? "text-blue-600 border-b-2 border-blue-500"
                                        : "text-gray-600 hover:text-blue-600"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="mt-4">{renderContent()}</div>
                    </div>
                </div>

                <div className="h-fit bg-white col-span-1 p-4 rounded-lg border border-gray-300">
                    <h3 className="font-medium mb-2">You may like</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            "Men Blazers Sets Elegant Formal",
                            "Men Shirt Sleeve Polo Contrast",
                            "Apple Watch Series Space Gray",
                            "Basketball Crew Socks Long Stuff",
                            "New Summer Men's castrol T-Shirts",
                        ].map((item, index) => (
                            <li key={index} className="text-blue-600">
                                {item} <span className="text-gray-500">$7.00 - $99.50</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Deals */}
            <DealsGrid />

            {/* Promotion Banner */}
            <PromotionBanner />
        </div>
    );
};

export default ProductDetails;