const SendQuote = () => {
  return (
    <section
      className="flex flex-col lg:flex-row justify-between rounded-md mt-8 mb-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488342994276-7c3bc0742042?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Left Content */}
      <div className="w-full lg:w-1/3 p-6 md:p-10 text-left text-white bg-black/40 lg:bg-transparent">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          An easy way to send requests to all suppliers
        </h2>
        <p className="mb-6 md:mb-8 max-w-md">
          Submit your product request and get quotes from verified suppliers.
        </p>
      </div>

      {/* Form */}
      <div className="w-full lg:w-5/12 p-4 sm:p-6 md:p-10">
        <form className="flex flex-col gap-4 text-left bg-white p-4 sm:p-6 rounded-md shadow-lg">
          <p className="text-lg md:text-xl font-bold">Send quote to suppliers</p>

          <input
            type="text"
            placeholder="What items do you need?"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            rows={4}
            placeholder="Type your details"
            className="resize-none border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Quantity"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full md:w-fit bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Send inquiry
          </button>
        </form>
      </div>
    </section>
  );
};

export default SendQuote;
