import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-6">
      <div className="mx-auto flex justify-between gap-4 bg-white border border-gray-200 p-4 rounded-md">
        {/* Sidebar Category Links */}
        <div className="hidden w-1/3 md:grid gap-3 text-gray-700">
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
        <div className="relative h-[380px] w-full">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Main Banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-10 left-10 flex flex-col">
            <span className="text-2xl">latest trending</span>
            <span className="text-3xl font-bold">Electronic items</span>
            <button className="w-fit bg-white hover:bg-white/60 p-2 rounded-md cursor-pointer mt-4">Learn more</button>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="w-1/4 hidden md:flex flex-col gap-3 justify-between">
          <div className="flex flex-col bg-blue-100 rounded-xl p-4">
            <p className=" text-gray-800 font-semibold">Hi, user let's get started</p>
            <Link to="/register" className="bg-blue-500 text-white text-center hover:bg-blue-600 p-2 rounded-md cursor-pointer mt-4">Join now</Link>
            <Link to="/login" className="bg-white text-blue-500 text-center hover:bg-gray-50 p-2 rounded-md cursor-pointer mt-4">Log in</Link>
          </div>

          <div className="bg-orange-400 text-white rounded-xl p-4">
            <p className="">Get US $10 off with a new supplier</p>
          </div>

          <div className="bg-sky-400 text-white rounded-xl p-4">
            <p className="">Send quotes with supplier preferences</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
