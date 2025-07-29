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
    <section className="py-8">
      <div className="flex flex-wrap items-center justify-center gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="text-4xl p-4 rounded-full bg-gray-200">{service.icon}</div>
            <h3 className="text-2xl font-semibold">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExtraServices;