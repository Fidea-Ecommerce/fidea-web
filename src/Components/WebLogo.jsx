import { Link } from "react-router-dom";

const WebLogo = ({ custom }) => {
  return (
    <Link
      to="/"
      className={`h-fit w-fit rounded-3xl bg-greenprime p-2 font-['Rubik_Mono_One'] text-white  sm:px-5 ${custom}`}
    >
      FIDEA
    </Link>
  );
};

export default WebLogo;
