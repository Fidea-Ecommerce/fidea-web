import Slider from "react-slick";
import Card from "../Components/Card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// !untuk sementara menggunakan data dummy json
// import productsData from "../ContohDataProduk.json";

const ProductSection = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProduct = async (username) => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const response = await fetch(
        `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/${username}`,
        {
          method: "GET",
          headers: headers,
        },
      );
      const json = await response.json();
      if (json.status_code === 200) {
        setList(json.result);
      }
      setIsLoading(false);
    };
    getProduct("nexblu");

    // ! untuk sementara menggunakan data dummy

    // setList(productsData);
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Ubah sesuai dengan jumlah item yang ingin ditampilkan dalam satu slide
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
                <p className="text-center text-lg  font-semibold">Loading...</p>
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
