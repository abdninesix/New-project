import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeaderTop from "./components/HeaderTop";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProductCreate from "./pages/ProductCreate";

function App() {
  return (
    <Router>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 overflow-x-hidden">
        <HeaderTop />
        <MainNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<ProductCreate />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
