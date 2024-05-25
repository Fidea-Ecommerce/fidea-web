import { Link } from "react-router-dom";
import WebLogo from "../Components/WebLogo";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterBG from "../assets/RegisterBG.webp";
import { Helmet } from "react-helmet";
import fidea from '../assets/fidea1.png'

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [messageEmailError, setMessageEmailError] = useState('');
  const [messageUsernameError, setMessageUsernameError] = useState('');
  const [messagePasswordError, setMessagePasswordError] = useState('');
  const [messageConfirmPasswordError, setMessageConfirmPasswordError] = useState('');

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = async () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = async () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const failedRegister = async () => {
    toast.error("Failed Register", {
      position: "bottom-right"
    });
  }

  const successRegister = async () => {
    toast.success("Check Your Email", {
      position: "bottom-right"
    });
  }

  const clearForm = async () => {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmailError(false)
    setUsernameError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    setMessageEmailError('')
    setMessageUsernameError('')
    setMessagePasswordError('')
    setMessageConfirmPasswordError('')
  }

  const validationForm = async () => {
    let valid = true;

    if (email === '') {
      setEmailError(true);
      valid = false;
      setMessageEmailError('Email Is Required.')
    } else {
      setEmailError(false)
    }

    if (username === '') {
      setUsernameError(true);
      valid = false;
      setMessageUsernameError('Username Is Required.')
    } else {
      setUsernameError(false);
    }

    if (password === '' && confirmPassword === '') {
      setPasswordError(true);
      setConfirmPasswordError(true)
      valid = false;
      setMessagePasswordError('Password Is Required.')
      setMessageConfirmPasswordError('Password Is Required.')
    } else {
      if (password === confirmPassword) {
        setPasswordError(false);
        setConfirmPasswordError(false);
      } else {
        setPasswordError(true);
        setConfirmPasswordError(true);
        valid = false;
        setMessagePasswordError('Password And Confirm Password Are Different.')
        setMessageConfirmPasswordError('Password And Confirm Password Are Different.')
      }
    }
    return valid;
  }

  const apiResgister = async (email, username, password, confirmPassword) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = 'https://ecommerce-api-production-facf.up.railway.app/fidea/v1/user/register';
    const data = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });

      const resp = await response.json();
      if (resp['status_code'] === 201) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const apiEmailVerify = async (email) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const url = 'https://ecommerce-api-production-facf.up.railway.app/fidea/v1/user/email-verify';
    const data = {
      email: email,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });

      const resp = await response.json();
      console.log(resp)
      if (resp['status_code'] === 201) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const validator = await validationForm()
    if (validator) {
      const resultRegister = await apiResgister(email, username, password, confirmPassword)
      if (resultRegister) {
        await clearForm()
        const finalResult = await apiEmailVerify(email)
        if (finalResult) {
          await successRegister()
          setLoading(false)
          return
        }
      }
    }
    await failedRegister()
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="flex h-screen max-h-screen w-screen flex-col justify-between   bg-white p-5 lg:flex-row lg:p-14">
        {/* Bagian untuk form */}
        <div className="my-auto flex w-full flex-1   flex-col items-center justify-center lg:m-0 lg:w-[400px]">
          <h1 className="mb-10 text-3xl font-semibold lg:text-4xl">
            Create an Account
          </h1>
          {/* Logo (misalnya WebLogo) */}
          <WebLogo />
          <p className="my-5 font-semibold">Please enter your details</p>
          <form className="sm:w-3/4 lg:w-4/5" onSubmit={loading ? null : handleSubmit}>
            {/* Input untuk email */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={`mb-2 w-full rounded-full border ${emailError ? "border-red-500" : "border-black"
                } p-3 pl-8 text-lg text-slate-700 outline-none`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-s m text-red-500">{messageEmailError}</p>
            )}
            {/* Input untuk username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={`mb-2 w-full rounded-full border ${usernameError ? "border-red-500" : "border-black"
                } p-3 pl-8 text-lg text-slate-700 outline-none`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <p className="text-sm text-red-500">{messageUsernameError}</p>
            )}
            {/* Input untuk password */}
            <div className="mb-2 flex w-full justify-between rounded-full border border-black p-3 pl-8 text-lg text-slate-700 outline-none">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`w-auto flex-1 border-none outline-none ${passwordError ? "border-red-500" : "border-black"
                  }  text-slate-700`}
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
            {passwordError && (
              <p className="text-sm text-red-500">{messagePasswordError}</p>
            )}
            {/* Input untuk konfirmasi password */}
            <div className="mb-2 flex w-full justify-between rounded-full border border-black p-3 pl-8 text-lg text-slate-700 outline-none">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`w-auto flex-1 border-none outline-none ${confirmPasswordError ? "border-red-500" : "border-black"
                  }  text-slate-700`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="mr-2 font-semibold text-greenprime"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-sm text-red-500">
                {messageConfirmPasswordError}
              </p>
            )}
            {/* Tombol Register */}
            <button
              // onClick={handleSubmit}
              type="submit"
              className="w-full rounded-3xl bg-greenprime px-4 py-3 text-xl font-bold text-white"
            >
              Register
            </button>
            <p className="pt-5 text-center text-slate-500">
              Already have an account? <span></span>
              <Link to={"/login  "} className="font-bold  text-greenprime ">
                Sign in now!
              </Link>
            </p>
          </form>
        </div>
        {/* Bagian untuk gambar */}
        <div className="hidden lg:block lg:w-[600px]">
          <img
            src={RegisterBG}
            alt="register image"
            className="h-full w-full rounded-3xl object-cover object-center"
          />
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default RegisterPage;
