import Slider from "react-slick";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "js-cookie";

const ProductSection = ({successAddFavoriteHomePage, successRemoveFavoriteHomePage}) => {
  const [listHomePage, setListHomePage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const getProduct = async (username) => {
        try {
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", `Bearer ${accessToken}`);
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
          if (json.status_code === 200) {
            setListHomePage(json.result.slice(0, 10)); // Limit to 10 items
          } else {
            throw new Error("Failed to fetch products");
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      getProduct("nexblu store");
    } else {
      setIsLoading(false);
    }
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrowarrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center bg-[#EBEBEB] pb-20 pt-10">
      <div>
        <h1 className="py-2 text-center text-xl font-bold md:py-10 md:text-4xl">
          Our Product
        </h1>

        <div className="flex w-screen items-center justify-center lg:w-[90vw] ">
          <div className=" mr-5 w-[95vw]  md:pl-4 lg:pl-14">
            {isLoading ? (
              <div className="flex h-72 items-center justify-center">
                <p className="text-center text-lg font-semibold">Loading...</p>
              </div>
            ) : error ? (
              <div className="flex h-72 items-center justify-center">
                <p className="text-center text-lg font-semibold text-red-600">
                  {error}
                </p>
              </div>
            ) : (
              <Slider
                {...settings}
                className="ml-5 flex items-center justify-center"
              >
                {listHomePage.map((product) => (
                  <div
                    key={product.product_id}
                    className="flex justify-center p-2"
                  >
                    <Card product={product} successAddFavoriteHomePage={successAddFavoriteHomePage} successRemoveFavoriteHomePage={successRemoveFavoriteHomePage} listHomePage={listHomePage} setListHomePage={setListHomePage} from={'HomePage'}/>
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
