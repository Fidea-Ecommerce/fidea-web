import { Link } from "react-router-dom";
import WebLogo from "../Components/WebLogo.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const apiLogin = async (email, password) => {
    const response = await fetch(
      `https://ecommerce-api-production-facf.up.railway.app/fidea/v1/user/login/${email}/${password}`,
    );
    const data = await response.json();
    if (data["status_code"] === 200) {
      return data["result"]["token"];
    } else {
      toast.error("Wrong email or password");
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await apiLogin(email, password);
    if (result) {
      console.log(result);
      Cookies.set("access_token", result);
      navigate("/");
    }
  };
  return (
    <div className="flex h-screen max-h-screen w-screen flex-col justify-between bg-white p-5 lg:flex-row lg:p-14">
      {/* Bagian untuk form */}
      <div className=" flex w-[400] flex-1 flex-col  items-center justify-center">
        <h1 className="mb-10 text-3xl font-semibold lg:text-4xl">
          Welcome Back 👋🏻
        </h1>
        <WebLogo></WebLogo>
        <p className="my-10 font-semibold">Please enter your details</p>
        <form className=" sm:w-3/4 lg:w-4/5" onSubmit={handleLogin}>
          {/* Menggunakan komponen InputForm untuk email */}
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="mb-2 w-full rounded-full border border-black p-3 pl-8  text-lg text-slate-700 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Menggunakan komponen InputForm untuk password */}
          <div className="mb-2 flex w-full justify-between rounded-full border border-black p-3 pl-8 text-lg text-slate-700 outline-none">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className=" w-auto flex-1 border-none outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="mr-2 font-semibold text-greenprime"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {/* Tombol Login */}
          <div className="mb-10 mt-5 flex items-center justify-between">
            <span>
              <input type="checkbox" className="" />
              <label className="ml-2 text-sm lg:text-lg">Remember me</label>
            </span>

            <Link
              to="/resetpassword"
              className="ml-2 text-sm text-slate-500 lg:text-lg"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className=" w-full rounded-3xl bg-greenprime px-4 py-3 text-xl font-bold text-white"
          >
            Login
          </button>
          <p className="pt-5 text-center text-slate-500">
            Don&apos;t have an account? <span></span>
            <Link to={"/register  "} className="font-bold  text-greenprime ">
              Sign up here!
            </Link>
          </p>
        </form>
      </div>
      {/* Bagian untuk gambar */}
      <div className="hidden lg:block lg:w-[600px]">
        <img
          src="src/assets/LoginBG.webp"
          alt="login image"
          className="h-full w-full rounded-3xl object-cover object-center"
        />
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default LoginPage;