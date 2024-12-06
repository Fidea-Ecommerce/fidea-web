// import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Navtab from "../Components/Navtab";
// import { Link } from "react-router-dom";

const HeaderPage = ({ custom }) => {
  return (
    <div>
      <section
        className={`${custom} fixed left-0 top-0  z-10 h-auto w-full border-b  border-slate-300 bg-[#EBEBEB] pb-2  lg:pb-5 `}
      >
        <Navbar custom="  mx-auto p-2 md:p-5 lg:px-14" text="text-black" />
        <div className="flex w-full items-center justify-center lg:justify-start">
          <Navtab custom={"mt-0"}></Navtab>
          {/* <Link
            to="/cart"
            className="mx-10  flex w-fit gap-4 rounded-3xl  bg-greenprime px-4 py-2 text-base font-semibold text-white"
          >
            Keranjang <FaShoppingCart size={20} color="white" />
          </Link> */}
        </div>
      </section>
    </div>
  );
};

export default HeaderPage;
