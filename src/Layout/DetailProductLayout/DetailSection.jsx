import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import MoreInfoProduct from "./MoreInfoProduct";
import { Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DetailSection = ({ custom, setTitle }) => {
  // mengambil ID dari routing lalu dicari ID  API card  menggunakan params, lalu merendernya
  const [isActive, setIsActive] = useState(false);
  let { store, storeId, id } = useParams(); // Terima ID produk dari URL
  const [product, setProduct] = useState();
  const [notFound, setNotFound] = useState(false);
  const [isInWishlist, setOnWishlist] = useState(false);

  const [amount, setAmount] = useState(0); // state amount wishlist
  const [stock, setStock] = useState(0); // state stock product

  const [token, setToken] = useState('')

  // mengambil data dari ecommerce-api
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken)
      const fetchData = async () => {
        try {
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", `Bearer ${accessToken}`);
          const response = await fetch(
            `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/${store}/${storeId}/${id}`,
            {
              method: "GET",
              headers: headers,
            }, // Perbaiki URL untuk mengambil detail produk berdasarkan ID
          );
          const json = await response.json();
          if (json.status_code === 200) {
            setProduct(json.result); // Jika berhasil, atur state untuk menyimpan detail produk
            setStock(json.result.stock); // Jika berhasil, atur state untuk menyimpan validasi stock
            setTitle(json.result.title)
          } else {
            setNotFound(true);
            console.error("Failed to fetch product:", json.message);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchData(); 
    }// Panggil fungsi untuk mengambil data produk saat komponen dimuat
  }, [store, id, storeId]);

  const apiAddCart = async (username, amount, product_id) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      username: username,
      amount: amount,
      product_id: parseInt(product_id), // ! UBAH KE INTEGER UNTUK KIRIM
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

  // function untuk button wishlist dan cart yang dimana nanti akan dimasukkan ke database

  const wishlistToggle = () => {
    setOnWishlist(!isInWishlist);
    if (!isInWishlist) {
      alert("Ditambahkan ke keranjangmu!");
    } else {
      alert("dihapus ke wishlistmu!");
    }
  };

  // handler button add amount cart
  const addProduct = async () => {
    if (amount < stock) {
      setAmount(parseInt(amount) + 1);
    }
  };

  // handler button min amount cart
  const minProduct = async () => {
    if (amount > 0) {
      setAmount(parseInt(amount) - 1);
    }
  };

  // function menambahkan ke cart
  const handleAddToCart = async () => {
    const result = await apiAddCart(user.username, amount, id);
    if (result) {
      toast.success("Added to cart");
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
              <span className="text-3xl">
                {product.price.toLocaleString("id-ID")}
              </span>
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
              onClick={wishlistToggle}
              className="h-fit rounded-full border border-black p-4 "
            >
              {isInWishlist ? (
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
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default DetailSection;
