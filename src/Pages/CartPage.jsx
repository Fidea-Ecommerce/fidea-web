import CartProductList from "../Components/CartProductList";
import HeaderPage from "../Layout/HeaderPage";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import fidea from "../assets/fidea.png";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [price, setPrice] = useState(0);
  const [token, setToken] = useState("");
  const [productCartProductList, setProductCartProductList] = useState([]);
  const [amountProduct, setAmountProduct] = useState(0);

  const navigate = useNavigate('/product')

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    const getCart = async (token) => {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");
      const response = await fetch(
        `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/cart/checkout`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const json = await response.json();
      if (json["status_code"] === 200) {
        setPrice(json["result"]["total_price"]);
      }
    };

    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      getCart(accessToken);
    }
  }, []);

  useEffect(() => {
    const nonZeroAmountProducts = productCartProductList.filter(product => product.amount > 0);
    setAmountProduct(nonZeroAmountProducts.length);
  }, [productCartProductList]);

  const failedCheckout = async () => {
    toast.error("Failed Checkout", {
      position: "bottom-right",
      autoClose: 3000,
    });
  }

  const checkout = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    const response = await fetch(
      "https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/checkout",
      {
        method: "POST",
        headers: headers,
      }
    );
    const resp = await response.json();
    return resp.status_code === 201;
  };

  const handleCheckout = async () => {
      const result = await checkout();
      if (result) {
        navigate('/products')
      } else {
        await failedCheckout()
      }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart Page</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="h-full min-h-screen bg-[#EBEBEB] pb-28 pt-28">
        <HeaderPage />
        <h1 className="mx-10 my-0 px-2 py-5 font-bold lg:my-10 lg:ml-10 lg:p-0 lg:text-4xl">
          Keranjang
        </h1>
        <section className="flex flex-col gap-8 pb-64 lg:m-10 lg:flex-row">
          <div className="w-screen">
            <CartProductList
              price={price}
              setPrice={setPrice}
              productCartProductList={productCartProductList}
              setProductCartProductList={setProductCartProductList}
              amountProduct={amountProduct}
              setAmountProduct={setAmountProduct}
            />
          </div>
          <div className="md:h fixed bottom-0 h-fit min-h-24 w-full flex-col justify-between border border-slate-300 bg-white p-5 lg:sticky lg:top-36 lg:flex lg:min-h-96 lg:w-[500px] lg:rounded-3xl lg:p-10">
            <h1 className="mb-5 text-end font-bold lg:text-start lg:text-2xl">
              Ringkasan belanja
            </h1>
            <div className="">
              <div className="flex h-fit w-full flex-row items-center justify-end gap-2 md:gap-10 lg:flex-col">
                <div className="flex items-center gap-5 border-b border-slate-300 lg:mb-5 lg:block lg:w-full lg:justify-between">
                  <h1 className="text-xl font-semibold">Total: </h1>
                  <h1 className="flex gap-1">
                    Rp
                    <span className="text-xl font-semibold">
                      {price.toLocaleString("id-ID")}
                    </span>
                  </h1>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-fit rounded-3xl bg-greenprime px-5 py-2 font-semibold text-white md:px-10 lg:w-full lg:text-xl"
                >
                  Beli ( {amountProduct} )
                </button>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default CartPage;
