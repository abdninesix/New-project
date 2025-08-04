import { Mail } from "lucide-react"

const Newsletter = () => {
    return (
        <div>
            {/* Subscribe Section */}
            <div className=" bg-gray-100 py-10 w-screen relative left-1/2 right-1/2 -translate-x-1/2">
                <div className="max-w-[1200px] mx-auto text-center md:text-left md:flex flex-col items-center justify-between gap-4">
                    <div className="mb-4 md:mb-0 text-center">
                        <h3 className="font-bold text-xl mb-1">Subscribe on our newsletter</h3>
                        <p className="text-gray-500 text-lg">Get daily news on upcoming offers from many suppliers all over the world</p>
                    </div>
                    <form className="w-full flex items-center justify-center gap-2 mt-4 md:mt-0">
                        <div className="w-1/3 flex gap-2 border border-gray-300 bg-white px-4 py-2 rounded-md">
                            <Mail className="text-gray-500" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-blue-500"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Newsletter