import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SearchBar = ({ custom }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No token available");
      return;
    }
    const results = await searchProduct(searchTerm, token);
    if (results.length > 0) {
      navigate(`/products/result/${searchTerm}`);
    } else {
      navigate("/result/notfound");
    }
  };

  const searchProduct = async (productName, token) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/search/${productName}`,
      {
        method: "GET",
        headers: headers,
      },
    );
    const json = await response.json();
    return json.status_code === 200 ? json.result : [];
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex h-3 w-fit items-center rounded-2xl border border-black bg-white p-4 text-sm sm:h-12 sm:p-5 lg:rounded-3xl lg:text-base ${custom}`}
    >
      <button type="submit" className="pr-2 text-slate-500 sm:pr-4">
        <IoIosSearch size={15} />
      </button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Cari Produk Anda disini..."
        className="w-42 border-none bg-transparent outline-none sm:w-64"
      />
    </form>
  );
};

export default SearchBar;
