import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeaderTop from "./components/HeaderTop";
import MainNavbar from "./components/MainNavbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="px-40">
        <HeaderTop />
        <MainNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
