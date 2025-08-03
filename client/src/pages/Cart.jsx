import { useState, useEffect } from "react";
import PromotionBanner from "../components/PromotionBanner";
import ExtraServices from "../components/ExtraServices";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart & saved items from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const storedSaved = JSON.parse(localStorage.getItem("savedItems")) || [];
        setCartItems(storedCart);
        setSavedItems(storedSaved);
        setIsLoaded(true);
    }, []);

    // Persist cart & saved items when they change (after first load)
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
            localStorage.setItem("savedItems", JSON.stringify(savedItems));
        }
    }, [cartItems, savedItems, isLoaded]);

    // Cart item quantity change
    const handleQuantityChange = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    // Remove from cart
    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
    };

    // Move to saved for later
    const moveToSaved = (id) => {
        const item = cartItems.find((item) => item._id === id);
        setCartItems((prev) => prev.filter((item) => item._id !== id));
        setSavedItems((prev) => [...prev, { ...item }]);
    };

    // Move back to cart
    const moveToCart = (id) => {
        const item = savedItems.find((item) => item._id === id);
        setSavedItems((prev) => prev.filter((item) => item._id !== id));
        setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="p-4 mx-auto bg-[#F7FAFC]">
            <h1 className="text-2xl font-bold mb-4">My Cart</h1>

            {/* CART SECTION */}
            <div className="min-h-[50vh] flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-600 text-center">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center justify-between border border-gray-300 p-4 rounded mb-4 bg-white"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{item.name}</h2>
                                        <p className="text-gray-600">Rs.{item.price}</p>
                                        <div className="flex text-lg font-bold items-center gap-4 mt-2">
                                            <button
                                                className="cursor-pointer"
                                                onClick={() => handleQuantityChange(item._id, -1)}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="cursor-pointer"
                                                onClick={() => handleQuantityChange(item._id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-red-500 hover:underline cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => moveToSaved(item._id)}
                                        className="text-blue-500 hover:underline cursor-pointer"
                                    >
                                        Save for later
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* SUMMARY SECTION */}
                <div className="w-full lg:w-1/3 border p-4 rounded h-fit border-gray-300 bg-white">
                    <h2 className="text-xl font-semibold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>Rs.{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Discount</span>
                        <span>-Rs.0.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>Rs.0.00</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-4">
                        <span>Total</span>
                        <span>Rs.{subtotal.toFixed(2)}</span>
                    </div>
                    <button className="mt-6 cursor-pointer bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded">
                        Checkout
                    </button>
                </div>
            </div>

            <ExtraServices />

            {/* SAVED FOR LATER */}
            {savedItems.length > 0 && (
                <div className="mt-8 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Saved for Later</h2>
                    <div className="flex flex-wrap gap-6">
                        {savedItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-lg border border-gray-300 p-4 w-full sm:w-[250px] flex flex-col"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded-md mb-2"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <h2 className="text-lg font-semibold line-clamp-1">{item.name}</h2>
                                    <p className="text-gray-500 text-xs">
                                        Category: {item.category?.name || "N/A"} | Stock: {item.stock ?? 0}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
                                        <span className="text-blue-600 font-bold">Rs.{item.price}</span>
                                        <span className="text-yellow-500">⭐⭐⭐⭐ 4.5</span>
                                        <span className="text-gray-500">(12K sold)</span>
                                    </div>

                                    <div className="flex justify-between mt-2 items-center">
                                        <button
                                            onClick={() => moveToCart(item._id)}
                                            className="w-fit hover:underline text-green-500 font-semibold text-sm"
                                        >
                                            Move to Cart
                                        </button>
                                        <Link
                                            to={`/products/${item._id}`}
                                            className="w-fit hover:underline text-blue-500 font-semibold text-sm"
                                        >
                                            View Details
                                        </Link>
                                        <Heart className="cursor-pointer text-gray-600 hover:text-red-500" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <PromotionBanner />
        </div>
    );
};

export default Cart;
