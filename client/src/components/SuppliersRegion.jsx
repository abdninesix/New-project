import { MapPin } from "lucide-react";

const regions = [
  "Asia",           // China
  "Europe",         // Germany
  "North America",  // United States
  "South America",  // Brazil
  "Africa",         // South Africa
  "Australia",      // Australia
  "Antarctica",     // Antarctica (has a special flag emoji)
  "Middle East",    // Saudi Arabia
  "Central America",// Mexico
  "Caribbean"       // Jamaica
];

const SuppliersRegion = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6">Suppliers by Region</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 px-6 mx-auto">
        {regions.map((region) => (
          <div
            key={region}
            className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg"
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