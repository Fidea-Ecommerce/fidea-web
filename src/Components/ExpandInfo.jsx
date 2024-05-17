import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const ExpandInfo = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b border-slate-300 ">
      <div
        className="flex justify-between p-3 pt-12 lg:p-8 "
        onClick={toggleExpand}
      >
        <h1 className="text-2xl font-semibold">{children}</h1>
        <button className="h-fit w-fit rounded-full bg-greenprime p-2 text-white">
          {isExpanded ? (
            <IoIosArrowDown size={30} color="white" />
          ) : (
            <IoIosArrowForward size={30} color="white" />
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="px-8 pb-5">
          {/* Ganti konten ini dengan deskripsi yang sebenarnya */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpandInfo;
