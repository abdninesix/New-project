import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeaderTop from "./components/HeaderTop";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProductCreate from "./pages/ProductCreate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./auth/ProtectedRoute"

function App() {
  return (
    <Router>
      <div className="overflow-x-hidden">
        <HeaderTop />
        <MainNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<ProtectedRoute adminOnly={true} ><ProductCreate /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute ><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
