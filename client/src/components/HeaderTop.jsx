import {
  User,
  MessageCircle,
  Heart,
  ShoppingCart,
  ShoppingBag,
  LayoutDashboard,
  LogOut,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

const HeaderTop = () => {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(); // Ref for hamburger menu

  // Load logged-in user from localStorage
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null);
    };

    updateUser();
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
    }, 800);

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
    navigate("/");
    window.location.reload();
    toast.info("Logged out successfully!");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 bg-white border-b border-gray-200 py-3 flex items-center justify-between gap-4 text-sm relative">
      {/* Logo */}
      <Link to="/" className="text-xl md:text-3xl font-bold text-blue-400 flex items-center gap-2">
        <ShoppingBag className="shadow-[5px_0px_0px] shadow-blue-400 size-8 md:size-10 bg-blue-500 rounded-lg p-2 text-white" />
        <span>Brand</span>
      </Link>

      {/* Search Bar */}
      <div className="flex flex-1 items-center max-w-2xl border-2 border-blue-500 rounded-md relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-2 text-sm focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchResults.length && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="hidden lg:block md:border-l-2 border-blue-500 p-1 text-sm focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home</option>
          <option value="fashion">Fashion</option>
        </select>
        <button className="bg-blue-500 text-white px-2 md:px-5 py-2 text-sm hover:bg-blue-600 cursor-pointer">
          Search
        </button>

        {/* Dropdown */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
            {searchResults.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                <span className="text-sm">{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Hamburger for small screens */}
      <button
        className="md:hidden text-gray-600 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>

      {/* Icons Section */}
      <div
        ref={menuRef}
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center gap-6 text-gray-500 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none py-4 md:py-0 z-50 transition-all duration-300`}
      >
        {user?.role === "admin" && (
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-xs">Admin</span>
          </Link>
        )}

        {user ? (
          <>
            <div onClick={handleLogout} className="flex flex-col items-center hover:text-red-600 cursor-pointer">
              <LogOut className="w-5 h-5" />
              <span className="text-xs">Logout</span>
            </div>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Link>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)} className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
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
        <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex flex-col items-center hover:text-blue-600 cursor-pointer">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-xs">My cart</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderTop;
