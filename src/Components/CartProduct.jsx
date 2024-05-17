import { useState } from "react";
import { FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartProduct = ({ product, token, user }) => {
  const [amount, setAmount] = useState(product.amount);

  // Fungsi untuk mengupdate jumlah produk di keranjang
  const handleUpdateAmount = async (newAmount) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    const data = {
      username: user.username,
      product_id: product.product_id,
      amount: newAmount,
    };
    const response = await fetch(
      "https://ecommerce-api-production-facf.up.railway.app/fidea/v1/cart/bill/amount",
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      },
    );
    const resp = await response.json();
    if (resp.status_code === 201) {
      setAmount(newAmount);
    }
  };
  console.log(product);

  // * API untuk delete product
  const deleteProduct = async (product) => {
    const token = Cookies.get("access_token");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      username: user.username,
      product_id: parseInt(product.product_id),
    };
    const response = await fetch(
      `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/cart`,
      {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data),
      },
    );
    const json = await response.json();
    if (json.status_code === 200) {
      toast.success("Product deleted successfully");
    }
  };

  // * button delete
  const handleDelete = (product) => {
    console.log("Deleting product with ID:", product.product_id); // Debugging log
    const result = deleteProduct(product);
    if (result) {
      toast.success("Berhasil dihapus ke keranjang!");
    }
    if (result === false) {
      toast.error("Gaga menghapus!");
    }
  };

  return (
    <div className="justify- relative flex border-t border-slate-300 p-2 py-3 sm:justify-between lg:p-10">
      <div className="flex w-full justify-normal gap-10 sm:w-fit sm:justify-between ">
        <input
          type="checkbox"
          className="ml-2 h-4 w-4 rounded-md md:mr-10 lg:h-6 lg:w-6"
          checked={true}
        />
        <Link
          // ! menggunakan props product , dan mengambil data product_id dan bukan id biasa
          to={`/products/detail/${product.product_id}`}
          className="flex gap-5"
        >
          {/* <!-- image --> */}
          <img
            src={product.image_url}
            className="object-fit h-20 w-20 rounded-2xl bg-gray-300 object-cover object-center md:mr-7 lg:h-44 lg:w-44"
            alt={product.title}
          />
          {/* <!-- image --> */}
          <div className="min-h-36 w-44 lg:w-96">
            <h1 className="mb-3 font-bold lg:text-2xl">{product.title}</h1>
            <p className="line-clamp-2 h-10 w-full max-w-[500px] truncate text-wrap pr-5 text-sm text-slate-400 lg:w-full">
              {product.description}
            </p>
          </div>
        </Link>
      </div>
      <div className="absolute bottom-2 right-0 flex-col justify-between pr-5 sm:static sm:flex">
        <h1 className="text-right text-lg font-semibold lg:text-xl">
          Rp <span>{product.price.toLocaleString("id-ID")}</span>
        </h1>
        <div className="flex gap-4">
          <button className="text-slate-300 lg:text-3xl">
            <FaRegHeart />
          </button>
          <button
            className="text-slate-300 lg:text-3xl"
            onClick={() => handleDelete(product)}
          >
            <FaRegTrashAlt />
          </button>
          <div className="flex items-center rounded-xl border-2 border-slate-300">
            <button
              className="px-3 font-bold text-gray-700"
              onClick={() => handleUpdateAmount(amount - 1)}
            >
              -
            </button>

            {/* JUMLAH PRODUCT TERGANTUNG DARI DATABASE */}
            <span className="px-4 text-gray-700">{amount}</span>

            <button
              className="px-3 font-bold text-greenprime"
              onClick={() => handleUpdateAmount(amount + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CartProduct;
