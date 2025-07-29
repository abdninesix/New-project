import Hero from "../components/Hero";
import DealsGrid from "../components/DealsGrid";
import SuppliersRegion from "../components/SuppliersRegion";
import ExtraServices from "../components/ExtraServices";
import SendQuote from "../components/SendQuote";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <DealsGrid />
      <SendQuote />
      <ExtraServices />
      <SuppliersRegion />
      <Newsletter />
    </>
  );
};

export default Home;
