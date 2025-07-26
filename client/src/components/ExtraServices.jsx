import { Truck, ShieldCheck, PackageCheck } from "lucide-react";

const services = [
  {
    icon: <Truck className="text-blue-600" />,
    title: "Fast Shipping",
    desc: "Get your products delivered quickly anywhere in the world."
  },
  {
    icon: <ShieldCheck className="text-blue-600" />,
    title: "Secure Payments",
    desc: "We ensure secure transactions through trusted gateways."
  },
  {
    icon: <PackageCheck className="text-blue-600" />,
    title: "Quality Assurance",
    desc: "Every product is checked for quality before delivery."
  }
];

const ExtraServices = () => {
  return (
    <section className="py-12 bg-gray-100 text-center mb-10">
      <h2 className="text-3xl font-bold mb-8">Our Extra Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow hover:shadow-md transition duration-200"
          >
            <div className="mb-4 text-4xl flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExtraServices;