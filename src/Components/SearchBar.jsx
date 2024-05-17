import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ custom }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchProduct(searchTerm);
    if (results.length > 0) {
      navigate(`/products/result/${searchTerm}`);
    } else {
      navigate("/result/notfound");
    }
    // Setelah mendapatkan hasil pencarian, navigasi ke halaman SearchResult dengan hasil pencarian sebagai parameter
  };

  const searchProduct = async (productName) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch(
      `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/product/search/nexblu/${productName}`,
      {
        method: "GET",
        headers: headers,
      },
    );
    const json = await response.json();
    return json.status_code === 200 ? json.result : [];
  };

  return (
    <>
      <form
        onSubmit={handleSearch} // Ganti onClick menjadi onSubmit
        className={`  flex h-2 w-fit items-center rounded-2xl border border-black bg-white p-3 text-sm sm:h-12 sm:p-5 lg:rounded-3xl lg:text-base ${custom}`}
      >
        <button type="submit" className="pr-2 text-slate-500 sm:pr-4">
          {" "}
          {/* Ganti button type menjadi submit */}
          <IoIosSearch size={15} />
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari Produk Anda disini..."
          className=" w-42  border-none  bg-transparent outline-none sm:w-64"
        />
      </form>
    </>
  );
};

export default SearchBar;
