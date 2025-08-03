import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShoppingBag,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] text-sm text-gray-700">

      {/* Links + App section */}
      <div className="bg-white py-10 px-4 text-lg">
        <div className="mx-auto grid grid-cols-2 md:grid-cols-6 gap-6 mb-8">

          {/* Logo and socials */}
          <div className="flex flex-col items-start gap-4 font-bold text-base">
            <span className="flex gap-2 items-center text-3xl text-blue-500"><ShoppingBag />Brand</span>
            <p className="text-gray-400 font-normal text-md">Best information about the company goes here</p>
            <div className="flex gap-4">
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
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-4">Partnership</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Money Refund</li>
              <li>Shipping</li>
              <li>Contact us</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold mb-4">For users</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Login</li>
              <li>Register</li>
              <li>Settings</li>
              <li>My Orders</li>
            </ul>
          </div>

          {/* App store */}
          <div>
            <h4 className="font-semibold mb-4">Get app</h4>
            <div className="flex flex-col gap-3">
              <img src="/appstore.jpg" alt="Google Play" className="w-32 rounded-lg cursor-pointer" />
              <img src="/googleplay.jpg" alt="App Store" className="w-32 rounded-lg cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between gap-2 bg-gray-100 text-gray-400">
          <span className="text-lg">&copy; {new Date().getFullYear()} Ecommerce.</span>
          <select
            className="rounded-md px-1 text-sm outline-none"
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
