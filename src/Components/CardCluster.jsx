import Card from "./Card";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
<<<<<<< HEAD
=======
import { useParams } from "react-router-dom";
>>>>>>> 6cd30306d1bf2e5f7563c3ea13479c8aedca96b7

// require API
const CardCluster = () => {
  // CONTOH API NYA bisa diganti sewaktu waktu atau tambah props supaya bisa di custom di page lain

  const [list, setList] = useState([]);
  let { store, storeId, title } = useParams();

  const [onLogin, setOnLogin] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
<<<<<<< HEAD
      setToken(accessToken);

      setOnLogin(true);
    }
  }, []);
=======
      const fetchData = async () => {
        try {
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", `Bearer ${accessToken}`);
          const response = await fetch(
            `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/search/${store}/${storeId}/${title}`,
            {
              method: "GET",
              headers: headers,
            }, // Perbaiki URL untuk mengambil detail produk berdasarkan ID
          );
          const json = await response.json();
          if (json.status_code === 200) {
            setList(json.result);
          }
        } catch (error) {
          // 
        }
      };
      fetchData();
    }// Panggil fungsi untuk mengambil data produk saat komponen dimuat
  }, [storeId, title, store]);
>>>>>>> 6cd30306d1bf2e5f7563c3ea13479c8aedca96b7

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
        <div key={product.product_id} className="flex justify-center">
          <Card product={product} setList={setList} />
        </div>
      ))}
    </div>
  );
};

export default CardCluster;
