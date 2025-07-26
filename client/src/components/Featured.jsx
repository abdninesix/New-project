const Featured = () => {
  const features = [
    "🚚 Free shipping",
    "🔄 7-day return",
    "💬 24/7 Support",
    "💳 Secure payments",
  ];

  return (
    <section className="bg-sky-50 py-6 px-10 mb-10">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        {features.map((item, i) => (
          <div key={i} className="bg-white py-4 px-2 rounded shadow-sm">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
