import { Helmet } from "react-helmet";
import fidea from '../assets/fidea1.png'

const ResetPassword1 = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="flex h-screen w-screen items-center justify-center  bg-[url('./src/assets/ResetBG.webp')] bg-cover bg-center bg-no-repeat">
        <form
          action=""
          className=" flex h-fit w-screen flex-col justify-center rounded-xl border border-slate-200 bg-gray-50 p-5 py-10 shadow-sm sm:h-fit sm:w-[500px]  md:p-14"
        >
          <h1 className="pb-5 text-center text-3xl font-semibold">
            Reset Password
          </h1>

          <input
            type="text"
            name="email"
            placeholder="Email"
            className="mb-5 w-full rounded-full border border-black px-3 py-2 pl-8 text-lg text-slate-700 outline-none"
          />

          <button
            type="submit"
            className="w-full rounded-3xl bg-greenprime px-4 py-3 text-xl font-bold text-white"
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassword1;
