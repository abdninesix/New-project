const Hero = () => {
  return (
    <section className="bg-sky-50 px-10 py-6">
      <div className="mx-auto flex justify-between gap-4 bg-white border border-gray-200 p-4 rounded-md">
        {/* Sidebar Category Links */}
        <div className="hidden md:flex flex-col gap-3 col-span-2 text-gray-700">
          {["Automobiles", "Clothes", "Electronics", "Home", "Beauty", "Sports", "Machinery"].map((cat) => (
            <button
              key={cat}
              className="rounded-md p-2 hover:bg-blue-50 text-left"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Banner Image */}
        <div className="h-[370px] w-full">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Main Banner"
            className="rounded-xl w-full h-full object-cover"
          />
        </div>

        {/* Right Side Cards */}
        <div className="hidden md:flex flex-col gap-3 col-span-3">
          <div className="bg-blue-100 rounded-xl p-4">
            <p className="font-semibold text-gray-800">Flash Deals</p>
            <p className="text-xs text-gray-600 mt-1">Up to 50% off</p>
          </div>

          <div className="bg-orange-400 text-white rounded-xl p-4">
            <p className="font-semibold">New Arrivals</p>
            <p className="mt-1">Latest trends</p>
          </div>

          <div className="bg-sky-400 text-white rounded-xl p-4">
            <p className="font-semibold">Send quotes with supplier preferences</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
