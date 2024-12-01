import { useRef } from "react";
import Navbar from "../Components/Navbar";
import LandingPage from "../Layout/LandingPage";
import ProductSection from "../Layout/ProductSection";
import { Helmet } from "react-helmet";
import fidea from "../assets/fidea1.png";
import { toast, ToastContainer } from "react-toastify";

const HomePage = () => {
  const productRef = useRef(null);

  const scrollToProduct = () => {
    if (productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const successAddFavoriteHomePage = async () => {
    toast.success("Success Add To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  }

  const successRemoveFavoriteHomePage = async () => {
    toast.success("Success Remove To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="scroll-smooth">
        <Navbar custom="text-black absolute p-5 sm:p-14 sm:py-10 md:bg-transparent bg-gray-50/50" />
        <LandingPage scrollToProduct={scrollToProduct} />
        <div ref={productRef}>
          <ProductSection id="product" successAddFavoriteHomePage={successAddFavoriteHomePage} successRemoveFavoriteHomePage={successRemoveFavoriteHomePage}/>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
