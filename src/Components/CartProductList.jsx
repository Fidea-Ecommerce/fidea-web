import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import Cookies from "js-cookie";

const CartProductList = ({ amountProduct, setAmountProduct, price, productCartProductList, setProductCartProductList, setPrice }) => {
  // State untuk data pengguna dan token
  const [token, setToken] = useState("");

  // Fungsi untuk memuat keranjang belanja pengguna
  useEffect(() => {
    const getCart = async (token) => {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");
      const response = await fetch(
        `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/cart`,
        {
          method: "GET",
          headers: headers,
        },
      );
      const json = await response.json();
      if (json["status_code"] === 200) {
        setProductCartProductList(json["result"]);
      }
    };

    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken);
      getCart(accessToken);
    }
  }, [setProductCartProductList]);

  return (
    <div className=" flex w-auto flex-col justify-between gap-5 md:mx-10 lg:mx-0 ">
      {/* <!-- product item --> */}
      <div className="  flex h-fit w-full items-center justify-between rounded-tl-xl rounded-tr-xl border-b border-slate-200 bg-white px-4 py-4   lg:rounded-tl-3xl lg:rounded-tr-3xl lg:p-10 ">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-7 h-4 w-4 rounded-sm border-2 border-blue-500 checked:border-transparent lg:h-6 lg:w-6"
            checked={true}
          />

          <label className="font-semibold lg:text-xl">Pilih semua </label>
        </div>
        <button className="font-bold text-greenprime lg:text-xl">Hapus</button>
      </div>

      {/* Menampilkan daftar produk atau pesan */}
      {productCartProductList.length === 0 ? (
        <p className="pt-5 text-center text-3xl font-semibold text-gray-500">
          {" "}
          Belum ada produk di keranjangmu.
        </p>
      ) : (
        <div className="flex flex-col overflow-hidden rounded-bl-3xl rounded-br-3xl bg-white">
          {productCartProductList.map((product) => (
            <CartProduct
              key={product.product_id}
              product={product}
              token={token}
              setPrice={setPrice}
              price={price}
              setAmountProduct={setAmountProduct}
              amountProduct={amountProduct}
              productCartProductList={productCartProductList}
              setProductCartProductList={setProductCartProductList}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartProductList;
