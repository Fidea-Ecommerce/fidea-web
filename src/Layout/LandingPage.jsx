const LandingPage = () => {
  return (
    <div className=" h-screen w-screen bg-[url('assets/LandingPageBG.webp')] bg-cover md:h-screen">
      <div className="flex h-screen w-full justify-center   ">
        <div className="flex h-screen w-fit flex-col items-center justify-center sm:items-start  ">
          <h1 className=" font-reguler text-center font-['Poller_One']  text-5xl leading-tight text-greenprime md:text-start md:text-[70px]">
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
