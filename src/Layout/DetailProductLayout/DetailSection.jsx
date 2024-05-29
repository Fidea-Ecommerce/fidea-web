import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import MoreInfoProduct from "./MoreInfoProduct";
import { Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const DetailSection = ({ custom }) => {
  // mengambil ID dari routing lalu dicari ID  API card  menggunakan params, lalu merendernya
  const [isActive, setIsActive] = useState(false);
  let { store, storeId, title } = useParams(); // Terima ID produk dari URL
  const [product, setProduct] = useState({
    price: null,
    title: "",
    description: "",
    image_url: "",
    is_favorite: false,
    stock: 0,
  });
  const [notFound, setNotFound] = useState(false);

  const [amount, setAmount] = useState(0); // state amount wishlist
  const [stock, setStock] = useState(0); // state stock product

  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);

  // mengambil data dari ecommerce-api
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken);
      const fetchData = async () => {
        try {
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", `Bearer ${accessToken}`);
          const response = await fetch(
            `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/title/${store}/${storeId}/${title}`,
            {
              method: "GET",
              headers: headers,
            }, // Perbaiki URL untuk mengambil detail produk berdasarkan ID
          );
          const json = await response.json();
          if (json.status_code === 200) {
            setProduct(json.result); // Jika berhasil, atur state untuk menyimpan detail produk
            setStock(json.result.stock); // Jika berhasil, atur state untuk menyimpan validasi stock
          } else {
            setNotFound(true);
            console.error("Failed to fetch product:", json.message);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchData();
    } // Panggil fungsi untuk mengambil data produk saat komponen dimuat
  }, [store, storeId, title]);

  const apiAddCart = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      amount: amount, // * default 1 untuk keranjang pada tombol di card component
      product_id: product.product_id,
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

  if (notFound) {
    return <Navigate to="/404" replace={true} />; // Tampilkan pesan jika produk tidak ditemukan
  }
  if (!product) {
    return (
      <div className="my-10 flex h-96 w-full items-center justify-center  text-center text-3xl font-bold">
        Loading...
      </div>
    ); // Tampilkan pesan loading jika data produk masih dimuat
  }

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  const successAddFavoriteDetailSection = async () => {
    toast.success("Success Add To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const failedAddFavoriteDetailSection = async () => {
    toast.error("Failed Add To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const successRemoveFavoriteDetailSection = async () => {
    toast.success("Success Remove To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const failedRemoveFavoriteDetailSection = async () => {
    toast.error("Failed Remove To Favorite", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const successAddCart = async () => {
    toast.success("Success Add To Cart", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const failedAddCart = async () => {
    toast.error("Failed Add To Cart", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  // function untuk button wishlist dan cart yang dimana nanti akan dimasukkan ke database

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

  const handleFavorite = async () => {
    setLoading(true);
    if (product.is_favorite == false) {
      const result = await apiAddFavorite();
      if (result) {
        await successAddFavoriteDetailSection();
        setProduct((prevProduct) => ({
          ...prevProduct,
          is_favorite: true,
        }));
      } else {
        await failedAddFavoriteDetailSection();
      }
    } else {
      const result = await apiRemoveFavorite();
      if (result) {
        await successRemoveFavoriteDetailSection();
        setProduct((prevProduct) => ({
          ...prevProduct,
          is_favorite: false,
        }));
      } else {
        await failedRemoveFavoriteDetailSection();
      }
    }
    setLoading(false);
  };

  // handler button add amount cart
  const addProduct = async () => {
    if (amount < stock) {
      setAmount(amount + 1);
    }
  };

  // handler button min amount cart
  const minProduct = async () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  // function menambahkan ke cart
  const handleAddToCart = async () => {
    const result = await apiAddCart();
    if (result) {
      await successAddCart();
      setAmount(0);
    } else {
      await failedAddCart();
    }
  };

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return price.toLocaleString("id-ID");
    }
  };

  return (
    <section
      className={`mb-0  h-fit min-h-screen rounded-3xl border border-slate-300 bg-white p-10 sm:m-10  ${custom}`}
    >
      <div className="flex h-auto w-full flex-col items-center justify-between gap-20 border-b border-slate-300 md:p-10 lg:flex-row">
        {/* image */}
        <div className=" h-72 w-72 rounded-xl border  md:h-96 md:w-96 ">
          <img
            src={product.image_url}
            className=" h-64 rounded-xl object-cover object-center p-5 md:h-96 md:w-96"
            alt=""
          />
        </div>

        {/* detail info */}
        <div className="w-full lg:w-96 ">
          {/* price and title */}
          <div className="border-b border-slate-300">
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-sm text-slate-500">{product.description}</p>
            <h1 className="mb-5 mt-10 flex items-start gap-1 font-semibold">
              <span className="font-sm h-full items-start">Rp</span>{" "}
              <span className="text-3xl">{formatPrice(product.price)}</span>
            </h1>
          </div>
          {/* variant */}
          <div className="h-fit border-b border-slate-300 py-3">
            <h2 className="font-semibold">Warna(2)</h2>

            <p className="text-sm text-greenprime">Hijau Muda</p>
            <div className="mt-5 flex w-96 gap-2 ">
              <button
                className={`h-8 w-8 ${isActive ? "border border-black" : ""}`}
                onClick={handleButtonClick}
              >
                <img
                  className="h-8 w-8 rounded-lg border border-black object-cover object-center"
                  src={product.image_url}
                  alt=""
                />
              </button>
              <button
                className={`h-8 w-8 overflow-hidden rounded-lg ${isActive ? "border border-black" : ""}`}
                onClick={handleButtonClick}
              >
                <img
                  className="h-8 w-8 rounded-lg border border-black object-cover object-center"
                  src={product.image_url}
                  alt=""
                />
              </button>
            </div>
          </div>
          {/* jumlah */}
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xl">Jumlah : </p>
            <div className="flex items-center rounded-3xl border border-slate-700  py-1">
              <button
                className="px-4 font-normal  text-greenprime"
                onClick={minProduct}
              >
                -
              </button>
              <span className="px-4 text-gray-700">{amount}</span>
              <button
                className="black px-4 text-2xl font-normal"
                onClick={addProduct}
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-5 mt-10 flex w-full items-center justify-between ">
            {/* MASUKKAN FUNCTION KERANJANG */}
            <button
              onClick={handleAddToCart}
              className=" rounded-full bg-greenprime p-4 font-semibold text-white"
            >
              Tambah ke Keranjang
            </button>
            <button
              onClick={loading ? null : handleFavorite}
              className="h-fit rounded-full border border-black p-4 "
            >
              {product.is_favorite ? (
                <FaHeart size={30} color="red" />
              ) : (
                <FaRegHeart size={30} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* More Info */}
      <div>
        <MoreInfoProduct description={product.description}></MoreInfoProduct>
      </div>
    </section>
  );
};

export default DetailSection;
