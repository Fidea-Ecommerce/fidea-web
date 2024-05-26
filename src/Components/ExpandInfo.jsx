import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const ExpandInfo = ({ children, description }) => {
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
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpandInfo;
