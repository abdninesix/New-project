import { MapPin } from "lucide-react";

const regions = [
  "Asia", "Europe", "North America", "South America", "Africa", "Australia"
];

const SuppliersRegion = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6">Suppliers by Region</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 max-w-4xl mx-auto">
        {regions.map((region) => (
          <div
            key={region}
            className="flex items-center gap-3 p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            <MapPin className="text-blue-600" />
            <span className="text-lg font-medium">{region}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuppliersRegion;