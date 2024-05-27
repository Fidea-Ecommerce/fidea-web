import { useState, useEffect } from "react";
import { FaRegHeart, FaRegTrashAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const CartProduct = ({
  setProductCartProductList,
  productCartProductList,
  amountProduct,
  setAmountProduct,
  product,
  token,
  setPrice,
  price,
}) => {
  const [amount, setAmount] = useState(product.amount);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(product.is_favorite);
  }, [product]);

  const successDeleteCart = async () => {
    toast.success("Success Delete From Cart", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const failedDeleteCart = async () => {
    toast.error("Failed Delete From Cart", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const successAddFavorite = async () => {
    toast.success("Success Add Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const failedAddFavorite = async () => {
    toast.error("Failed Add Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const successRemoveFavorite = async () => {
    toast.success("Success Remove Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const failedRemoveFavorite = async () => {
    toast.error("Failed Remove Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const apiRemoveFavorite = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      seller_id: product.store_id,
      product_id: product.product_id,
    };
    const response = await fetch(
      "https://ecommerce-api-production-facf.up.railway.app/fidea/v1/user/favorite",
      {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data),
      },
    );
    const resp = await response.json();
    if (resp.status_code === 201) {
      return true;
    } else {
      return false;
    }
  };

  const apiAddFavorite = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      seller_id: product.store_id,
      product_id: product.product_id,
    };
    const response = await fetch(
      "https://ecommerce-api-production-facf.up.railway.app/fidea/v1/user/favorite",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      },
    );
    const resp = await response.json();
    if (resp.status_code === 201) {
      return true;
    } else {
      return false;
    }
  };

  const handleFavorite = async () => {
    if (isFavorite === false) {
      const result = await apiAddFavorite();
      if (result) {
        await successAddFavorite();
        setIsFavorite(true);
      } else {
        await failedAddFavorite();
      }
    } else {
      const result = await apiRemoveFavorite();
      if (result) {
        await successRemoveFavorite();
        setIsFavorite(false);
      } else {
        await failedRemoveFavorite();
      }
    }
  };

  // Fungsi untuk mengupdate jumlah produk di keranjang
  const handleUpdateAmount = async (newAmount, condition) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    const data = {
      cart_id: product.cart_id,
      amount: newAmount,
    };
    const response = await fetch(
      "https://ecommerce-api-production-facf.up.railway.app/fidea/v1/cart/amount",
      {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      },
    );
    const resp = await response.json();
    if (resp.status_code === 201) {
      setAmount(newAmount);
      if (condition === "-") {
        setPrice(price - product.price);
        setAmountProduct(newAmount === 0 ? amountProduct - 1 : amountProduct);
      } else {
        setPrice(price + product.price);
      }
    }
  };

  // * API untuk delete product
  const deleteProduct = async () => {
    const token = Cookies.get("access_token");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      cart_id: product.cart_id,
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
    if (json.status_code === 201) {
      const filteredProducts = productCartProductList.filter((product_) => {
        if (product_.cart_id === product.cart_id) {
          return false;
        }
        return true;
      });
      setProductCartProductList(filteredProducts);
      return true;
    } else {
      return false;
    }
  };

  // * button delete
  const handleDelete = async () => {
    const result = deleteProduct();
    if (result) {
      setPrice(price - product.total_price);
      await successDeleteCart();
    }
    if (result === false) {
      await failedDeleteCart();
    }
  };

  return (
    <div className=" relative flex border-t border-slate-300 p-2 py-3 sm:justify-between lg:p-10">
      <div className="flex w-auto justify-normal  sm:w-fit sm:justify-between ">
        <input
          type="checkbox"
          className="ml-2 h-4 w-4 rounded-md md:mr-10 lg:h-6 lg:w-6"
          checked={true}
        />
        <Link
          // ! menggunakan props product , dan mengambil data product_id dan bukan id biasa
          to={`/products/detail/${product.store}/${product.store_id}/${product.title}`}
          className="flex "
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
      <div className="absolute bottom-2 right-0 flex-col justify-between  sm:static sm:flex">
        <h1 className="text-right text-lg font-semibold lg:text-xl">
          Rp <span>{product.price.toLocaleString("id-ID")}</span>
        </h1>
        <div className="flex gap-4">
          <button
            className="text-slate-300 lg:text-3xl"
            onClick={handleFavorite}
          >
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
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
              onClick={() => handleUpdateAmount(amount - 1, "-")}
            >
              -
            </button>

            {/* JUMLAH PRODUCT TERGANTUNG DARI DATABASE */}
            <span className="px-4 text-gray-700">{amount}</span>

            <button
              className="px-3 font-bold text-greenprime"
              onClick={() => handleUpdateAmount(amount + 1, "+")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
