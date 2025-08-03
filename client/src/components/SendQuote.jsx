const SendQuote = () => {
  return (
    <section className="flex justify-between rounded-md mt-8 mb-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488342994276-7c3bc0742042?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>

      <div className="w-1/3 p-10 text-left text-white">
        <h2 className="text-3xl font-bold mb-4">An easy way to send requests to all suppliers</h2>
        <p className="mb-8 mx-auto">
          Submit your product request and get quotes from verified suppliers.
        </p>
      </div>

      <div className="w-5/12 p-10">
        <form className="flex flex-col gap-4 text-left bg-white p-4 rounded-md">
          <p className="text-xl font-bold">Send quote to suppliers</p>
          <input
            type="text"
            placeholder="What items do you need?"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows={4}
            type="email"
            placeholder="Type your details"
            className="resize-none border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <button
            type="submit"
            className="w-fit bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition md:col-span-2"
          >
            Send inquiry
          </button>
        </form>
      </div>
    </section>
  );
};

export default SendQuote;
