import { MdPerson } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoIosHome } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaBoxesPacking } from "react-icons/fa6";
import { FaInfo, FaShoppingCart } from "react-icons/fa";
import { Button, Drawer, Popover } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import WebLogo from "./WebLogo";
import SearchBar from "./SearchBar";
import { jwtDecode } from "jwt-decode";
import { useStateHistory } from "@mantine/hooks";

const Navbar = (props) => {
  const history = useStateHistory();
  const [user, setUser] = useState();
  const { text = "text-white", custom } = props;
  const [onLogin, setOnLogin] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null); // State untuk ancor Popover

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      //  * jika user login maka akan ditampilkan profile di navbar jika tidak maka akan menampilkan tombol login
      setOnLogin(true);
      const decodeToken = jwtDecode(accessToken);
      setUser(decodeToken);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("access_token");
    setUser(null);
    history.push("/");
    window.location.reload();
  };

  const toggleDrawer = (open) => () => {
    setMobileDrawerOpen(open);
  };

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const openPopover = Boolean(popoverAnchorEl);

  const navLinks = [
    { to: "/", text: "Home", icon: <IoIosHome size={30} /> },
    { to: "/about", text: "About", icon: <FaInfo size={30} /> },
    { to: "/products", text: "Product", icon: <FaBoxesPacking size={30} /> },
    { to: "/contact", text: "Contact Us", icon: <IoCall size={30} /> },
    { to: "/cart", text: "Your Cart", icon: <FaShoppingCart size={30} /> },
  ];

  // * inisialisasi variabel list untuk di render di drawer comp
  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="flex h-fit flex-col items-center  font-semibold "
    >
      <ul className={`${text} flex w-56  flex-col gap-5  px-5  font-semibold`}>
        <div className="border-b-2 border-slate-500 py-5">
          <li className="flex items-center justify-center">
            {onLogin ? (
              ""
            ) : (
              <Link
                to="/login"
                className="rounded-3xl bg-greenprime px-5 py-1 font-bold text-white"
              >
                Login
              </Link>
            )}
          </li>
          <li className=" ">
            {onLogin === false ? (
              ""
            ) : (
              <div className="flex items-center gap-5 font-normal ">
                <div className="w-fit rounded-3xl  bg-greenprime p-2 font-bold ">
                  {/* USERNAME */}
                  <MdPerson />
                </div>
                <span className="text-black">{user.username}</span>
                <button
                  className="text-sm font-semibold text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </div>
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink to={link.to} className="flex gap-5 text-greenprime">
              {link.icon}
              {link.text}
            </NavLink>
          </li>
        ))}
        <li>
          {/* <NavLink
            to={"/cart"}
            className="flex h-fit w-fit items-center rounded-3xl   text-greenprime"
          >
            <FaShoppingCart size={30} className="mr-5" /> <span> </span>{" "}
            Keranjang{" "}
          </NavLink> */}
        </li>
      </ul>
    </div>
  );

  // *untuk menyimpan list yang akan ditampilkan component drawer saat responsive

  return (
    <div className={`flex h-fit w-full items-center justify-between ${custom}`}>
      <WebLogo custom={" text-xs  sm:text-xl"}></WebLogo>

      <SearchBar></SearchBar>

      {/* * untuk desktop,saat responsive navbar desktopp akan dihidden */}
      <div className=" hidden lg:flex">
        <ul
          className={`${text} flex w-fit items-center gap-5 justify-self-end font-semibold drop-shadow-xl`}
        >
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to}>{link.text}</NavLink>
            </li>
          ))}
          {/* <NavLink
            to={"/cart"}
            className="flex h-fit w-fit items-center rounded-3xl bg-greenprime px-3 py-1 text-white"
          >
            Keranjang <span> </span> <FaShoppingCart size={20} />{" "}
          </NavLink> */}
          <li>
            {onLogin ? (
              ""
            ) : (
              <Link
                to="/login"
                className="rounded-3xl bg-greenprime px-5 py-1 font-bold text-white"
              >
                Login
              </Link>
            )}
          </li>
          <li>
            {onLogin === false ? (
              ""
            ) : (
              <div className="flex items-center gap-1 font-normal">
                <div className="rounded-3xl bg-greenprime p-3 font-bold text-white">
                  <MdPerson />
                </div>
                <Popover
                  open={openPopover}
                  anchorEl={popoverAnchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <div>
                    <button
                      onClick={handleLogout}
                      className=" bg-red-600 p-3 font-semibold text-white"
                    >
                      Logout
                    </button>
                  </div>
                </Popover>
                <Button onClick={handlePopoverOpen}>
                  <span className="rounded-lg bg-white/50 p-2 font-bold text-greenprime ">
                    {user.username}
                  </span>
                </Button>
              </div>
            )}
          </li>
        </ul>
      </div>
      {/* =======desktop end */}

      {/* untuk mobile nav drawer */}
      <div className="h-fit w-fit pt-2 lg:hidden ">
        {" "}
        {/* Display for mobile */}
        <button onClick={toggleDrawer(true)} className="h-fit w-fit text-black">
          <GiHamburgerMenu size={30} color="black" />
        </button>
        <Drawer
          anchor="right"
          open={mobileDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
