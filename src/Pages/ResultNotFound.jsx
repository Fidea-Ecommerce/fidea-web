import HeaderPage from "../Layout/HeaderPage";

const ResultNotFound = () => {
  return (
    <section className="h-auto min-h-screen  w-full bg-[#EBEBEB] ">
      <HeaderPage custom={" "}></HeaderPage>
      <div className="flex h-screen w-full items-center justify-center text-center text-4xl font-semibold text-greenprime">
        Whoops, No Results!
      </div>
    </section>
  );
};

export default ResultNotFound;
