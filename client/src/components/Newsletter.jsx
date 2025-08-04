import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <div>
      {/* Subscribe Section */}
      <div className="bg-gray-100 py-10 w-screen relative left-1/2 right-1/2 -translate-x-1/2">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Text Section */}
          <div className="mb-6">
            <h3 className="font-bold text-lg sm:text-xl mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
              Get daily news on upcoming offers from many suppliers all over the world
            </p>
          </div>

          {/* Form Section */}
          <form className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="w-full sm:w-2/3 md:w-1/3 flex gap-2 border border-gray-300 bg-white px-3 py-2 rounded-md">
              <Mail className="text-gray-500 shrink-0" />
              <input
                type="email"
                placeholder="Email"
                className="focus:outline-none w-full text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-blue-500 w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
