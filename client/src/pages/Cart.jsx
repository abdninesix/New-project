import { useState } from "react";
import PromotionBanner from "../components/PromotionBanner";
import ExtraServices from "../components/ExtraServices";

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Product One",
            price: 99.99,
            quantity: 1,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Product Two",
            price: 149.99,
            quantity: 2,
            image: "https://via.placeholder.com/150",
        },
    ]);

    const [savedItems, setSavedItems] = useState([
        {
            id: 3,
            name: "Saved Product",
            price: 89.99,
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "Saved Product",
            price: 89.99,
            image: "https://via.placeholder.com/150",
        },
    ]);

    const handleQuantityChange = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const moveToSaved = (id) => {
        const item = cartItems.find((item) => item.id === id);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setSavedItems((prev) => [...prev, item]);
    };

    const moveToCart = (id) => {
        const item = savedItems.find((item) => item.id === id);
        setSavedItems((prev) => prev.filter((item) => item.id !== id));
        setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="p-4 mx-auto bg-sky-50">
            <h1 className="text-2xl font-bold mb-4">My Cart</h1>

            {/* CART SECTION */}
            <div className="min-h-[50vh] flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
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
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            className="px-2 border"
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="px-2 border"
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => moveToSaved(item.id)}
                                    className="text-blue-500"
                                >
                                    Save for later
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SUMMARY SECTION */}
                <div className="w-full lg:w-1/3 border p-4 rounded h-fit border-gray-300 bg-white">
                    <h2 className="text-xl font-semibold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Discount</span>
                        <span>-$0.00</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-4">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
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
                                key={item.id}
                                className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-32 object-cover rounded mb-4"
                                />
                                <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                                <p className="text-gray-600 mb-3">${item.price.toFixed(2)}</p>
                                <button
                                    onClick={() => moveToCart(item.id)}
                                    className="mt-auto text-sm text-green-600 hover:underline"
                                >
                                    Move to Cart
                                </button>
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
