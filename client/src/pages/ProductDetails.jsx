import Breadcrumbs from "../components/Breadcrumbs";
import PromotionBanner from "../components/PromotionBanner";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import DealsGrid from "../components/DealsGrid";
import { toast } from "react-toastify";
import { CheckSquare, Globe, Loader2, PinIcon, ShoppingCart } from "lucide-react";

const tabs = ["Description", "Reviews", "Shipping", "About Seller"];

const ProductDetails = () => {
  const { id } = useParams();
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
        return (
          <p className="text-gray-700">
            {product?.description || "No description available."}
          </p>
        );
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

  if (loading) return <div className="flex items-center justify-center"><Loader2 className="animate-spin w-4 h-4" /></div>;
  if (!product) return <div className="h-screen text-center text-red-500">Product not found.</div>;

  return (
    <div className="bg-[#F7FAFC] text-gray-900 pb-8 px-4 md:px-8 lg:px-16 xl:px-32 duration-200">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Main Product Section */}
      <div className="bg-white grid grid-cols-1 lg:grid-cols-11 gap-6 rounded-lg border border-gray-300">
        {/* Left: Product Info */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="p-4 flex flex-col justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-80 sm:h-96 object-cover rounded"
            />
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={product.image}
                  alt="thumb"
                  className="border border-gray-300 size-14 md:size-16 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-4 space-y-4">
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <div className="text-orange-600 font-bold text-2xl">Rs.{product.price}</div>
            <div
              className={`${product.stock > 0 ? "text-green-600" : "text-red-600"} font-medium text-xl`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </div>
            <div className="text-yellow-500">⭐⭐⭐⭐ 4.5</div>
            <div className="text-gray-500">(12K sold)</div>
            <div>
              <strong>Stock:</strong> {product.stock || "Out of stock"} left
            </div>
            <div>
              <strong>Warranty:</strong> (N/A)
            </div>
            <div>
              <strong>Category:</strong> {product.category?.name || "N/A"}
            </div>

            {/* Add to Cart Button */}
            {product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className="mt-6 flex gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Right: Supplier Info */}
        <div className="lg:col-span-3 h-fit bg-white p-4 rounded-lg border m-8 border-gray-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-sky-50 w-10 h-10 flex items-center justify-center text-2xl rounded">
                R
              </div>
              <p className="font-semibold">Supplier Trading LLC</p>
            </div>
            <div className="text-gray-400 space-y-2 mt-5 text-sm sm:text-base">
              <p className="flex items-center gap-3">
                <PinIcon /> Germany, Berlin
              </p>
              <p className="flex items-center gap-3">
                <CheckSquare /> Verified Seller
              </p>
              <p className="flex items-center gap-3">
                <Globe /> Worldwide Shipping
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer">
              Send Inquiry
            </button>
            <button className="bg-white hover:bg-gray-50 border border-gray-300 text-blue-500 px-4 py-2 rounded w-full cursor-pointer">
              Seller's profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-4 gap-8 mt-8">
        <div className="col-span-3 p-4 bg-white rounded-lg border border-gray-300 order-2 lg:order-1">
          <div>
            <div className="flex flex-wrap gap-4 sm:gap-6">
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

        <div className="h-fit bg-white col-span-1 p-4 rounded-lg border border-gray-300 order-1 lg:order-2">
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
