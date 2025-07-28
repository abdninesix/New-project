import HeaderTop from "../components/HeaderTop";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import { useState } from "react";
import PromotionBanner from "../components/PromotionBanner";

const tabs = ["Description", "Reviews", "Shipping", "About Seller"];

const dummyProducts = Array(14).fill({
    title: "Wireless Earbuds",
    price: "$49.99",
    desc: "High-quality wireless earbuds with noise cancellation.",
    image: "https://images.unsplash.com/photo-1722439667098-f32094e3b1d4?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
});

const ProductDetails = () => {

    const [activeTab, setActiveTab] = useState("Description");

    const renderContent = () => {
        switch (activeTab) {
            case "Description":
                return <p className="text-gray-700">This is the product description. It gives an overview of the item.</p>;
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

    return (
        <div className="bg-sky-50 text-gray-900">

            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Product Info */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Image */}
                    <div className="bg-white rounded-lg p-4">
                        <img
                            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Product"
                            className="w-full h-auto rounded"
                        />
                        <div className="flex gap-2 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    src="https://images.unsplash.com/photo-1547809483-f9bb32b1cb49?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="thumb"
                                    className="w-18 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white rounded-lg p-4 space-y-4">
                        <h1 className="text-xl font-semibold">
                            Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
                        </h1>
                        <div className="text-green-600 font-medium">In stock</div>
                        <div className="space-y-1">
                            <div className="text-orange-600 font-bold text-lg">$98.00</div>
                            <div className="text-sm">50-100 pcs</div>
                            <div className="text-gray-500 line-through">$90.00 100-700 pcs</div>
                            <div className="text-gray-500 line-through">$78.00 700+ pcs</div>
                        </div>
                        <div className="text-sm text-gray-700">
                            <strong>Price:</strong> Negotiable <br />
                            <strong>Type:</strong> Classic shoes <br />
                            <strong>Material:</strong> Plastic material <br />
                            <strong>Design:</strong> Modern nice <br />
                            <strong>Customization:</strong> Customized logo and packages <br />
                            <strong>Protection:</strong> Refund Policy <br />
                            <strong>Warranty:</strong> 2 years full warranty
                        </div>
                    </div>
                </div>

                {/* Right: Supplier Info */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-200 size-10 rounded">R</div>
                            <div>
                                <p className="font-semibold">Supplier Trading LLC</p>
                                <p className="text-sm text-gray-500">Germany, Berlin</p>
                                <p className="text-xs text-green-600">Verified Seller</p>
                            </div>
                        </div>
                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
                            Send Inquiry
                        </button>
                        <button className="mt-2 text-blue-600 text-sm w-full">
                            Seller's profile
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
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
            </div>

            {/* Tabs Section */}
            <div className="max-w-7xl mx-auto px-4 py-6 bg-white rounded-lg">
                <div className="mt-8">
                    <div className="border-b flex gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 text-sm md:text-base font-medium ${activeTab === tab
                                    ? "text-blue-600 border-b-2 border-blue-600"
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

            {/* Related Products */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h3 className="text-lg font-semibold mb-4">Related products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {dummyProducts.map((product) => (
                        <div className="bg-white p-2 rounded text-sm text-center">
                            <img src={product.image} alt="related" className="w-full h-40 object-cover mb-2" />
                            {product.title} <br />
                            <span className="text-gray-500">{product.price}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Promotion Banner */}
            <PromotionBanner />

        </div>
    );
};

export default ProductDetails;
