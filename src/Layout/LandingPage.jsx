import Navbar from "../Components/Navbar";

const LandingPage = () => {
  return (
    <div className=" h-[50dvh] w-screen bg-[url('assets/LandingPageBG.webp')] bg-cover md:h-screen">
      <Navbar custom="text-black p-5 sm:p-14 sm:py-10"></Navbar>
      <div className=" mt-5 flex w-full justify-center lg:mt-16 ">
        <div className="flex w-fit flex-col items-center justify-center sm:items-start ">
          <h1 className=" font-reguler  font-['Poller_One'] text-4xl leading-tight text-greenprime md:text-[70px]">
            MINIMALIST <br />
            FURNITURE
          </h1>
          <a
            href="#our-product"
            className=" w-fit rounded-3xl  bg-greenprime  px-10 py-3 font-bold  text-white"
          >
            Show More
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
