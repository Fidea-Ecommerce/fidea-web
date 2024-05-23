import Card from "./Card";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// require API
const CardCluster = () => {
  // CONTOH API NYA bisa diganti sewaktu waktu atau tambah props supaya bisa di custom di page lain

  const [list, setList] = useState([]);

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
  }, [onLogin, token]);

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
