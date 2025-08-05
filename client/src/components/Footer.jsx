import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] text-gray-700">

      {/* Links + App section */}
      <div className="bg-white py-10 text-lg px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

          {/* Logo and socials */}
          <div className="flex flex-col items-start gap-6 justify-between font-bold text-base">
            <Link to="/" className="text-3xl font-bold text-blue-400 flex items-center gap-2">
              <ShoppingBag className="shadow-[5px_0px_0px] shadow-blue-400 size-10 bg-blue-500 rounded-lg p-2 text-white" /><span>Brand</span>
            </Link>
            <p className="text-gray-400 font-normal text-md">Best information about the company goes here</p>
            <div className="flex gap-5">
              <Facebook className="size-6 hover:fill-blue-500 hover:text-blue-500 cursor-pointer" />
              <Twitter className="size-6 hover:fill-sky-400 hover:text-sky-400 cursor-pointer" />
              <Linkedin className="size-6 hover:fill-blue-600 hover:text-blue-600 cursor-pointer" />
              <Instagram className="size-6 hover:text-pink-400 cursor-pointer" />
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="cursor-pointer hover:text-blue-500">About Us</li>
              <li className="cursor-pointer hover:text-blue-500">Find store</li>
              <li className="cursor-pointer hover:text-blue-500">Categories</li>
              <li className="cursor-pointer hover:text-blue-500">Blogs</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-4">Partnership</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="cursor-pointer hover:text-blue-500">About Us</li>
              <li className="cursor-pointer hover:text-blue-500">Find store</li>
              <li className="cursor-pointer hover:text-blue-500">Categories</li>
              <li className="cursor-pointer hover:text-blue-500">Blogs</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="cursor-pointer hover:text-blue-500">Help Center</li>
              <li className="cursor-pointer hover:text-blue-500">Money Refund</li>
              <li className="cursor-pointer hover:text-blue-500">Shipping</li>
              <li className="cursor-pointer hover:text-blue-500">Contact us</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold mb-4">For users</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="cursor-pointer hover:text-blue-500">Login</li>
              <li className="cursor-pointer hover:text-blue-500">Register</li>
              <li className="cursor-pointer hover:text-blue-500">Settings</li>
              <li className="cursor-pointer hover:text-blue-500">My Orders</li>
            </ul>
          </div>

          {/* App store */}
          <div>
            <h4 className="font-semibold mb-4">Get app</h4>
            <div className="flex flex-col gap-3">
              <img src="/appstore.jpg" alt="Google Play" className="w-32 rounded-lg cursor-pointer hover:opacity-85" />
              <img src="/googleplay.jpg" alt="App Store" className="w-32 rounded-lg cursor-pointer hover:opacity-85" />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between gap-2 bg-gray-100 text-gray-400 px-4 md:px-8 lg:px-16 xl:px-32 py-4 w-screen relative left-1/2 right-1/2 -translate-x-1/2">
          <span className="text-lg">&copy; {new Date().getFullYear()} Ecommerce.</span>
          <select
            className="rounded-md px-1 text-sm outline-none cursor-pointer hover:text-blue-500"
          >
            <option value="relevance">English</option>
            <option value="latest">German</option>
            <option value="price-low">Urdu</option>
            <option value="price-high">French</option>
            <option value="price-high">Arabic</option>
            <option value="price-high">Russian</option>
          </select>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
