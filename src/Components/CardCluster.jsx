import Card from "./Card";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// require API
const CardCluster = () => {
  // CONTOH API NYA bisa diganti sewaktu waktu atau tambah props supaya bisa di custom di page lain

  const [list, setList] = useState([]);
  let { store, storeId, title } = useParams();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const fetchData = async () => {
        try {
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", `Bearer ${accessToken}`);
          const response = await fetch(
            `https://9f334khh-5000.asse.devtunnels.ms/fidea/v1/product/search/${store}/${storeId}/${title}`,
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
    } // Panggil fungsi untuk mengambil data produk saat komponen dimuat
  }, [storeId, title, store]);

  const successAddFavoriteCardCluester = async () => {
    toast.success("Success Add To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const successRemoveFavoriteCardCluester = async () => {
    toast.success("Success Remove To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-y-5 px-5 py-8  sm:grid-cols-4 lg:grid-cols-4 lg:gap-y-20">
      {list.map((product) => (
        <div key={product.product_id} className="flex justify-center">
          <Card
            product={product}
            setList={setList}
            list={list}
            from={"CardCluster"}
            successAddFavoriteCardCluester={successAddFavoriteCardCluester}
            successRemoveFavoriteCardCluester={
              successRemoveFavoriteCardCluester
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CardCluster;
