const SendQuote = () => {
  return (
    <section className="py-16 px-6 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Send a Quote to Suppliers</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Submit your product request and get quotes from verified suppliers.
        </p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Product Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <textarea
            rows="4"
            placeholder="Describe your requirements"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition md:col-span-2"
          >
            Send Quote
          </button>
        </form>
      </div>
    </section>
  );
};

export default SendQuote;
