import Navbar from "../Components/Navbar";
import LandingPage from "../Layout/LandingPage";
import ProductSection from "../Layout/ProductSection";

const HomePage = () => {
  return (
    <div className="scroll-smooth bg-[#EBEBEB] pb-10">
      <Navbar custom="text-black p-5 sm:p-14 sm:py-10 fixed top-0 md:bg-transparent bg-gray-50/50"></Navbar>
      <LandingPage></LandingPage>
      <ProductSection></ProductSection>
    </div>
  );
};

export default HomePage;
