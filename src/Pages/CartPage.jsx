import CartProductList from "../Components/CartProductList";
import HeaderPage from "../Layout/HeaderPage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const [product, setProduct] = useState([]); // state list bill product
  const [price, setPrice] = useState(0);
  // state user
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

  // * API get total product di keranjang
  useEffect(() => {
    const getCart = async (token, username) => {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");
      const response = await fetch(
        `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/cart/bill/tick/${username}`,
        {
          method: "GET",
          headers: headers,
        },
      );
      const json = await response.json();
      if (json["status_code"] === 200) {
        setProduct(json["result"]["item"]);
        console.table(json.result.item);
        setPrice(json["result"]["total_price"]);
      }
    };

    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      getCart(accessToken, decodedToken.username);
    }
  }, []);

  const checkout = async (token, user) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const data = {
      username: user.username,
    };
    const response = await fetch(
      " https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/checkout",
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

  const handleCheckout = async () => {
    try {
      const result = await checkout(token, user.username);
      if (result) {
        toast.success("Checkout success");
      } else {
        toast.error("Checkout failed");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed");
    }
  };
  console.log(token);
  console.log(user);

  return (
    <div className="h-full min-h-screen bg-[#EBEBEB] pb-28 pt-28">
      <HeaderPage></HeaderPage>
      <h1 className="mx-10 my-0 px-2 py-5 font-bold lg:my-10 lg:ml-10 lg:p-0 lg:text-4xl">
        Keranjang
      </h1>
      <section className="flex flex-col gap-8 pb-64 lg:m-10 lg:flex-row">
        {/* main content */}

        <div className="w-screen">
          <CartProductList product={product}></CartProductList>
        </div>
        {/* main content end */}

        {/* SUMMARY  PRICE SECTION */}
        <div className="md:h fixed bottom-0 h-fit min-h-24 w-full flex-col  justify-between border border-slate-300 bg-white p-5 lg:sticky lg:top-36 lg:flex lg:min-h-96 lg:w-[500px] lg:rounded-3xl lg:p-10">
          {/* SUMMARY  */}
          <h1 className="mb-5 text-end font-bold lg:text-start lg:text-2xl">
            Ringkasan belanja
          </h1>
          <div className="">
            <div className="flex h-fit w-full flex-row items-center justify-end  gap-2 md:gap-10 lg:flex-col ">
              <div className="flex items-center gap-5 border-b border-slate-300 lg:mb-5 lg:block lg:w-full lg:justify-between">
                <h1 className="text-xl font-semibold">Total: </h1>
                <h1 className="flex gap-1">
                  Rp{" "}
                  <span className="text-xl font-semibold">
                    {" "}
                    {price.toLocaleString("id-ID")}
                  </span>
                </h1>
              </div>
              <button
                onClick={handleCheckout}
                className=" w-fit rounded-3xl bg-greenprime px-5 py-2 font-semibold text-white md:px-10 lg:w-full  lg:text-xl"
              >
                Beli ( {product.length} )
              </button>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CartPage;