import Card from "./Card";
import { useState, useEffect } from "react";

// require API
const CardCluster = () => {
  // CONTOH API NYA bisa diganti sewaktu waktu atau tambah props supaya bisa di custom di page lain

  const [list, setList] = useState([]);

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
    };
    getProduct("nexblu");
  }, []);

  return (
    <div className="grid grid-cols-2 gap-y-5 px-5 py-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-y-20 ">
      {list.map((product) => (
        <div key={product.id} className="flex justify-center">
          <Card product={product} />
        </div>
      ))}
    </div>
  );
};

export default CardCluster;
