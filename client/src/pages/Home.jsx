import Hero from "../components/Hero";
import DealsGrid from "../components/DealsGrid";
import SuppliersRegion from "../components/SuppliersRegion";
import ExtraServices from "../components/ExtraServices";
import SendQuote from "../components/SendQuote";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 bg-[#F7FAFC] ">
      <Hero />
      <SendQuote />
      <DealsGrid />
      <ExtraServices />
      <SuppliersRegion />
      <Newsletter />
    </div>
  );
};

export default Home;
