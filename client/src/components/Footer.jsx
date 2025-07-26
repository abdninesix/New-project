import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] text-sm text-gray-700">
      {/* Subscribe Section */}
      <div className="border-t border-b border-gray-200 py-10 px-4">
        <div className="max-w-[1200px] mx-auto text-center md:text-left md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold text-lg mb-1">Subscribe on our newsletter</h3>
            <p className="text-gray-500 text-sm">Get daily news on upcoming offers from many suppliers all over the world</p>
          </div>
          <form className="flex items-center gap-2 mt-4 md:mt-0">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links + App section */}
      <div className="bg-gray-900 text-gray-300 py-10 px-4">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Partnership</h4>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Money Refund</li>
              <li>Shipping</li>
              <li>Contact us</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4">For users</h4>
            <ul className="space-y-2">
              <li>Login</li>
              <li>Register</li>
              <li>Settings</li>
              <li>My Orders</li>
            </ul>
          </div>

          {/* App store */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get app</h4>
            <div className="flex flex-col gap-3">
              <img src="/apple.png" alt="App Store" className="w-32" />
              <img src="/google.png" alt="Google Play" className="w-32" />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <span className="text-blue-500">🏪 Brand</span>
            <p className="text-gray-400 font-normal text-xs">Best information about the company goes here</p>
          </div>

          <div className="flex gap-4 text-white">
            <Facebook className="w-4 h-4 hover:text-blue-500 cursor-pointer" />
            <Twitter className="w-4 h-4 hover:text-sky-500 cursor-pointer" />
            <Linkedin className="w-4 h-4 hover:text-blue-400 cursor-pointer" />
            <Instagram className="w-4 h-4 hover:text-pink-400 cursor-pointer" />
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span className="border px-2 py-1 rounded text-xs">🇺🇸 English</span>
            <span>&copy; 2025 Ecommerce.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
