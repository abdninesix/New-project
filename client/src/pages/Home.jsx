import Hero from "../components/Hero";
import Featured from "../components/Featured";
import DealsGrid from "../components/DealsGrid";
import SuppliersRegion from "../components/SuppliersRegion";
import ExtraServices from "../components/ExtraServices";
import SendQuote from "../components/SendQuote";

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <DealsGrid />
      <SendQuote />
      <ExtraServices />
      <SuppliersRegion />
    </>
  );
};

export default Home;
