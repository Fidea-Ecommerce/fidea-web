import { FaArrowUp } from "react-icons/fa";
import Card from "../Components/Card";
import HeaderPage from "../Layout/HeaderPage";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import fidea from "../assets/fidea1.png";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [listProductPage, setListProductPage] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [onLogin, setOnLogin] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken);

      setOnLogin(true);
    }
  }, []);

  useEffect(() => {
    if (onLogin) {
      const getProduct = async (username, token) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        const response = await fetch(
          `https://9f334khh-5000.asse.devtunnels.ms/fidea/v1/product/${username}/1`,
          {
            method: "GET",
            headers: headers,
          },
        );
        const json = await response.json();
        if (json.status_code === 200) {
          setListProductPage(json.result);
        }
      };
      const accessToken = Cookies.get("access_token");
      setToken(accessToken);
      if (accessToken) {
        getProduct("nexblu store", token);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onLogin, token]);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const successAddFavoriteProductPage = async () => {
    toast.success("Success Add To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const successRemoveFavoriteProductPage = async () => {
    toast.success("Success Remove To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <section className="h-auto min-h-screen  w-full bg-[#EBEBEB] ">
        <HeaderPage custom={" "}></HeaderPage>
        {onLogin ? (
          <div className="grid grid-cols-2 gap-y-5 px-5 py-8 pb-28 pt-28 sm:grid-cols-3 md:grid-cols-5 md:pt-[170px] lg:grid-cols-4  lg:gap-y-20  ">
            {/* Looping dari API nya  */}
            {listProductPage.map((product) => (
              <div key={product.product_id} className="flex justify-center">
                <Card
                  successAddFavoriteProductPage={successAddFavoriteProductPage}
                  successRemoveFavoriteProductPage={
                    successRemoveFavoriteProductPage
                  }
                  product={product}
                  listProductPage={listProductPage}
                  setListProductPage={setListProductPage}
                  from={"ProductPage"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center">
            <p className="text-bold text-center text-2xl  text-slate-500">
              You need to login first
            </p>
          </div>
        )}
        {/* Tombol Scroll To Top */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10  right-10 h-fit w-fit  rounded-full  bg-greenprime p-5 text-white shadow-md transition duration-300 ease-in-out hover:bg-gray-600 xl:hidden"
          >
            <FaArrowUp color="white" size={30} />
          </button>
        )}
      </section>
      <ToastContainer />
    </>
  );
};

export default ProductPage;
