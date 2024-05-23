import { useEffect, useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = (props) => {
  const { product } = props;
  // membuat fungsi untuk menambahkan ke keranjang dan wishlist

  const [isInWishlist, setOnWishlist] = useState(false);

  // const successWishlist = () => {
  //   toast.success("DItambahkan ke favorit!", {
  //     position: "top-center",
  //   });
  // };

  // const removeWishlist = () => {
  //   toast.success("Dihapus dari favorit!", {
  //     position: "top-center",
  //   });
  // };

  const wishlistToggle = () => {
    setOnWishlist(!isInWishlist);
    if (!isInWishlist) {
      alert("Ditambahkan ke favorit!");
      // successWishlist();
    } else {
      // removeWishlist();
      alert("Dihapus dari favorit!");
    }
  };

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setToken(accessToken);
      setUser(decodedToken);
    }
  }, []);

  const apiAddCart = async (username) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      username: username,
      amount: 1, // * default 1 untuk keranjang pada tombol di card component
      product_id: parseInt(product.product_id), // ! UBAH KE INTEGER UNTUK KIRIM
      seller: "nexblu",
    };
    const response = await fetch(
      "https://ecommerce-api-production-facf.up.railway.app/fidea/v1/cart",
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

  // function menambahkan ke cart
  const addToCart = () => {
    const result = apiAddCart(user.username, 1, product.product_id);
    if (result) {
      toast.success("Berhasil dimasukkan ke keranjang!");
    }
    if (result === false) {
      toast.error("Gagal dimasukkan ke keranjang!");
    }
    // toast.success("Berhasil dimasukkan ke keranjang!");
  };

  return (
    <div className="border-slate relative flex w-36 flex-col justify-between overflow-hidden rounded-xl lg:h-[500px] lg:w-72 lg:rounded-3xl ">
      <Link
        to={`/products/detail/${product.store}/${product.store_id}/${product.product_id}`}
        className="relative flex h-full w-36 flex-col justify-between rounded-2xl border border-slate-300 bg-white p-2 drop-shadow-sm lg:w-72 lg:rounded-3xl lg:p-5"
      >
        <img
          className="h-32 w-32 self-center rounded-xl object-cover  lg:h-60 lg:w-60"
          src={product.image_url}
          alt={product.title}
        />
        <h1 className="text-md mt-5 min-h-10 font-bold lg:text-2xl">
          {product.title}
        </h1>
        <p className="line-clamp-2 h-12  truncate  text-wrap text-xs text-slate-400 lg:h-20 lg:min-h-16  lg:text-base">
          {product.description}
        </p>
        <h1 className="mt-3 flex items-start gap-1 font-semibold">
          <span className="font-sm h-full items-start justify-start self-start">
            Rp <br />
          </span>{" "}
          <span className="lg:text-3xl">
            {product.price.toLocaleString("id-ID")}
          </span>
        </h1>
      </Link>
      <button
        onClick={addToCart}
        className="absolute bottom-2 right-2 h-fit w-fit rounded-full bg-greenprime p-1 lg:bottom-5 lg:right-5 lg:p-3 lg:text-2xl"
      >
        <FaCartPlus color="white" />
      </button>
      <button
        onClick={wishlistToggle}
        className="absolute right-1 top-1 h-fit w-fit rounded-bl-xl rounded-tr-xl bg-white p-2 text-xl lg:right-5 lg:top-5 lg:rounded-bl-3xl lg:p-3  lg:text-3xl"
      >
        {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
      <ToastContainer />
    </div>
  );
};

export default Card;
