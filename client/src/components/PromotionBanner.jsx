import React from 'react'

const PromotionBanner = () => {
    return (
        <div className="flex gap-60 justify-between items-center bg-blue-600 text-white py-6 px-4 rounded-md">
            <div>
                <h2 className="text-xl font-bold">Super discount on more than 100 USD</h2>
                <p className="text-sm mt-1">Have you ever finally just write dummy info</p>
            </div>

            <button className="mt-4 px-6 py-2 bg-orange-400 hover:bg-orange-500 cursor-pointer text-white rounded">Shop now</button>
        </div>
    )
}

export default PromotionBanner