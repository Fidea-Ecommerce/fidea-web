import Navbar from "../Components/Navbar";
import LandingPage from "../Layout/LandingPage";
import ProductSection from "../Layout/ProductSection";
import { Helmet } from "react-helmet";
import fidea from '../assets/fidea1.png'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="scroll-smooth bg-[#EBEBEB] pb-10">
        <Navbar custom="text-black p-5 sm:p-14 sm:py-10 fixed top-0 md:bg-transparent bg-gray-50/50"></Navbar>
        <LandingPage></LandingPage>
        <ProductSection></ProductSection>
      </div>
    </>
  );
};

export default HomePage;
