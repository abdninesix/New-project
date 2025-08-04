import React from 'react';

const PromotionBanner = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-500 text-white py-6 px-4 sm:px-8 rounded-md gap-4 sm:gap-8">
      {/* Text Section */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-bold">
          Super discount on more than 100 USD
        </h2>
        <p className="text-xs sm:text-sm mt-1">
          Have you ever finally just write dummy info
        </p>
      </div>

      {/* Button */}
      <button className="px-6 py-2 bg-orange-400 hover:bg-orange-500 cursor-pointer text-white rounded w-full sm:w-auto">
        Shop now
      </button>
    </div>
  );
};

export default PromotionBanner;
