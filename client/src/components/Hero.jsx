import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section>
      <div className="pt-8 grid grid-cols-1 md:grid-cols-8 gap-4 bg-white border border-gray-200 md:p-4 rounded-md">
        {/* Sidebar Category Links */}
        <div className="hidden md:block col-span-2 text-gray-700">
          {[
            "Automobiles",
            "Clothes and wear",
            "Home interiors",
            "Computer and tech",
            "Tools, equipments",
            "Sports and outdoor",
            "Animal and pets",
            "Machinery tools",
            "More catergory",
          ].map((cat) => (
            <button
              key={cat}
              className="w-full rounded-md p-2 hover:bg-blue-50 text-left"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Banner Image */}
        <div className="relative col-span-1 md:col-span-6 xl:col-span-5 h-56 sm:h-64 md:h-[400px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Main Banner"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex flex-col">
            <span className="text-lg sm:text-2xl">latest trending</span>
            <span className="text-xl sm:text-3xl font-bold">Electronic items</span>
            <button className="w-fit bg-white hover:bg-white/60 p-2 rounded-md cursor-pointer mt-3 sm:mt-4 text-sm sm:text-base">
              Learn more
            </button>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="hidden xl:grid col-span-1 grid-rows-3 gap-2 text-sm">
          <div className="row-span-2 flex flex-col justify-between bg-blue-100 rounded-md p-4 text-base">
            <p className="text-gray-800 font-semibold">
              Hi, user let's get started
            </p>
            <Link
              to="/register"
              className="bg-blue-500 text-white text-center hover:bg-blue-600 p-2 rounded-md cursor-pointer"
            >
              Join now
            </Link>
            <Link
              to="/login"
              className="bg-white text-blue-500 text-center hover:bg-gray-50 p-2 rounded-md cursor-pointer"
            >
              Log in
            </Link>
          </div>

          <div className="row-span-1 bg-orange-400 text-white rounded-md p-4">
            <p>Get US $10 off with a new supplier</p>
          </div>

          <div className="row-span-1 bg-sky-400 text-white rounded-md p-4">
            <p>Send quotes with supplier preferences</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
