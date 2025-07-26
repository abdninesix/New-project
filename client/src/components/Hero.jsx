const Hero = () => {
  return (
    <section className="bg-sky-50 px-4 py-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Sidebar Category Links */}
        <div className="hidden md:flex flex-col gap-3 col-span-3 text-sm text-gray-700">
          {["Automobiles", "Clothes", "Electronics", "Home", "Beauty", "Sports", "Machinery"].map((cat) => (
            <button
              key={cat}
              className="hover:text-blue-600 text-left"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Banner Image */}
        <div className="col-span-12 md:col-span-6">
          <img
            src="https://via.placeholder.com/600x300?text=Main+Banner"
            alt="Main Banner"
            className="rounded-xl w-full h-full object-cover"
          />
        </div>

        {/* Right Side Cards */}
        <div className="hidden md:flex flex-col gap-3 col-span-3">
          <div className="bg-blue-100 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-800">Flash Deals</p>
            <p className="text-xs text-gray-600 mt-1">Up to 50% off</p>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-800">New Arrivals</p>
            <p className="text-xs text-gray-600 mt-1">Latest trends</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
