import {
  User,
  MessageCircle,
  Heart,
  ShoppingCart,
  ShoppingBag,
  LayoutDashboard,
  LogOut,
  LogIn
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const HeaderTop = () => {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Load logged-in user from localStorage
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null);
    };

    // On mount
    updateUser();

    // Listen for custom events
    window.addEventListener("userChange", updateUser);

    return () => window.removeEventListener("userChange", updateUser);
  }, []);


  // Debounce search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        fetchProducts(searchQuery);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchProducts = async (query) => {
    try {
      const res = await API.get(`/products?search=${encodeURIComponent(query)}`);
      setSearchResults(res.data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-4 text-sm relative">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-blue-400 flex items-center gap-2">
        <ShoppingBag /><span>Brand</span>
      </Link>

      {/* Search Bar + Category */}
      <div className="flex-1 flex items-center max-w-3xl border border-blue-500 rounded-md relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-3 py-3 rounded-l-md focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-x border-gray-300 px-3 py-2 focus:outline-none"
        >
          <option value="all">All category</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home</option>
          <option value="fashion">Fashion</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700">
          Search
        </button>

        {/* Search Suggestions Dropdown */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
            {searchResults.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => console.log("Clicked product:", product.name)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="text-sm">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Icons Section */}
      <div className="flex items-center gap-6 text-gray-700">
        {user?.role === "admin" && (
          <Link to="/dashboard" className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs">Admin Panel</span>
          </Link>
        )}

        {user ? (
          <>
            {/* Profile */}
            <div
              onClick={handleLogout}
              className="flex flex-col items-center hover:text-red-600 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs">Logout</span>
            </div>
            <Link to="/profile" className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Link>
          </>
        ) : (
          <Link to="/login" className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
            <LogIn className="w-5 h-5" />
            <span className="text-xs">Login</span>
          </Link>
        )}

        <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">Message</span>
        </div>
        <div className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <Heart className="w-5 h-5" />
          <span className="text-xs">Orders</span>
        </div>
        <Link to="/cart" className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs">My cart</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderTop;
