import Slider from "react-slick";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";

const ProductSection = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [onLogin, setOnLogin] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken);
      setOnLogin(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getProduct = async (username, token) => {
      try {
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json.result);
        if (json.status_code === 200) {
          setList(json.result);
        } else {
          console.error("Error in JSON response:", json);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (onLogin && token) {
      getProduct("nexblu store", token);
    }
  }, [onLogin, token]);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center bg-[#EBEBEB]">
      <div>
        <h1 className="py-2 text-center text-xl font-bold md:py-10 md:text-4xl">
          Our Product
        </h1>

        <div className="flex w-full items-center justify-center">
          <div className="w-[90%]">
            {isLoading ? (
              <div className="flex h-72 items-center justify-center">
                <p className="text-center text-lg font-semibold">Loading...</p>
              </div>
            ) : (
              <Slider
                {...settings}
                className="ml-5 flex items-center justify-center lg:pl-20"
              >
                {list.map((product) => (
                  <div key={product.id} className="flex justify-center">
                    <Card product={product} />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to="/products"
            className="mt-5 rounded-3xl bg-greenprime px-8 py-4 text-xl font-semibold text-white"
          >
            SHOW MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
