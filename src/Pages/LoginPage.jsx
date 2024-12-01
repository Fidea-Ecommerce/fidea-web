import { Link } from "react-router-dom";
import WebLogo from "../Components/WebLogo.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import LoginBG from "../assets/LoginBG.webp";
import { Helmet } from "react-helmet";
import fidea from "../assets/fidea1.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const apiLogin = async (email, password) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const url = "https://9f334khh-5000.asse.devtunnels.ms/fidea/v1/user/login";
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      const resp = await response.json();
      if (response.ok) {
        return { status: true, result: resp.result };
      } else {
        return { status: false, message: resp.message };
      }
    } catch (error) {
      return { status: false, message: "Network error. Please try again." };
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous errors
    const result = await apiLogin(email, password);
    if (result.status) {
      Cookies.set("access_token", result.result.token.access_token);
      Cookies.set("refresh_token", result.result.token.refresh_token);
      navigate("/");
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="flex h-screen max-h-screen w-screen flex-col justify-between bg-white p-5 lg:flex-row lg:p-14">
        {/* Form Section */}
        <div className="flex w-[400] flex-1 flex-col items-center justify-center">
          <h1 className="mb-10 text-3xl font-semibold lg:text-4xl">
            Welcome Back 👋🏻
          </h1>
          <WebLogo></WebLogo>
          <p className="my-10 font-semibold">Please enter your details</p>
          <form
            className="sm:w-3/4 lg:w-4/5"
            onSubmit={loading ? null : handleLogin}
          >
            {/* Email Input */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="mb-2 w-[90vw] rounded-full border border-black p-3 pl-8 text-lg text-slate-700 outline-none sm:w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Input */}
            <div className="mb-2 flex w-[90vw] justify-between rounded-full border border-black p-3 pl-8 text-lg text-slate-700 outline-none sm:w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-[90] flex-1 border-none outline-none sm:w-auto"
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
            {/* Error Message */}
            {error && <p className="mb-2 text-red-500">{error}</p>}
            {/* Remember Me and Forgot Password */}
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
            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-3xl bg-greenprime px-4 py-3 text-xl font-bold text-white"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="pt-5 text-center text-slate-500">
              Don&apos;t have an account? <span></span>
              <Link to="/register" className="font-bold text-greenprime">
                Sign up here!
              </Link>
            </p>
          </form>
        </div>
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={LoginBG}
            alt="login image"
            className="h-full w-full rounded-3xl object-cover object-center"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
