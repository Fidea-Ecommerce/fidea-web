import { FaArrowUp } from "react-icons/fa";
import HeaderPage from "../Layout/HeaderPage";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import Cookies from "js-cookie";
=======
import { Helmet } from "react-helmet";
import fidea from '../assets/fidea1.png'

>>>>>>> 860818ba80677b61938feb57a1a9bd1dd3487f9c

const SearchResult = () => {
  const { productName } = useParams();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [list, setList] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (token) {
          headers.append("Authorization", `Bearer ${token}`);
        }

        const response = await fetch(
          `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/search/nexblu store/1/${productName}`,
          {
            method: "GET",
            headers: headers,
          },
        );

        const json = await response.json();
        if (json.status_code === 200) {
          setList(json.result);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (token) {
      fetchSearchResults();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [productName, token]);

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
<<<<<<< HEAD
    <section className="h-auto min-h-screen w-full bg-[#EBEBEB]">
      <HeaderPage custom={" "}></HeaderPage>
      <div className="grid grid-cols-2 gap-y-5 px-5 py-28 sm:grid-cols-3 md:grid-cols-5 md:pt-[170px] lg:grid-cols-4 lg:gap-y-20">
        {list.map((product) => (
          <div key={product.id} className="flex justify-center">
            <Card product={product} />
          </div>
        ))}
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 h-fit w-fit rounded-full bg-greenprime p-5 text-white shadow-md transition duration-300 ease-in-out hover:bg-gray-600 xl:hidden"
        >
          <FaArrowUp color="white" size={30} />
        </button>
      )}
    </section>
=======
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Result</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <section className="h-auto min-h-screen  w-full bg-[#EBEBEB] ">
        <HeaderPage custom={" "}></HeaderPage>
        <div className="grid grid-cols-2 gap-y-5 px-5 py-28 sm:grid-cols-3 md:grid-cols-5 md:pt-[170px] lg:grid-cols-4  lg:gap-y-20  ">
          {/* Looping dari API nya  */}
          {list.map((product) => (
            <div key={product.id} className="flex justify-center">
              <Card product={product} />
            </div>
          ))}
        </div>

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
    </>
>>>>>>> 860818ba80677b61938feb57a1a9bd1dd3487f9c
  );
};

export default SearchResult;
