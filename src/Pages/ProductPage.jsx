import { FaArrowUp } from "react-icons/fa";
import Card from "../Components/Card";
import HeaderPage from "../Layout/HeaderPage";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ProductPage = () => {
  const [list, setList] = useState([]);
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
          `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/${username}/1`,
          {
            method: "GET",
            headers: headers,
          },
        );
        const json = await response.json();
        console.log(json.result);
        if (json.status_code === 200) {
          setList(json.result);
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

  return (
    <section className="h-auto min-h-screen  w-full bg-[#EBEBEB] ">
      <HeaderPage custom={" "}></HeaderPage>
      {onLogin ? (
        <div className="grid grid-cols-2 gap-y-5 px-5 py-8 pb-28 pt-28 sm:grid-cols-3 md:grid-cols-5 md:pt-[170px] lg:grid-cols-4  lg:gap-y-20  ">
          {/* Looping dari API nya  */}
          {list.map((product) => (
            <div key={product.id} className="flex justify-center">
              <Card product={product} />
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
  );
};

export default ProductPage;
