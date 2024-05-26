import HeaderPage from "../Layout/HeaderPage";
import { Helmet } from "react-helmet";
import fidea from '../assets/fidea1.png'

const ResultNotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Result Not Found</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <section className="h-auto min-h-screen  w-full bg-[#EBEBEB] ">
        <HeaderPage custom={" "}></HeaderPage>
        <div className="flex h-screen w-full items-center justify-center text-center text-4xl font-semibold text-greenprime">
          Whoops, No Results!
        </div>
      </section>
    </>
  );
};

export default ResultNotFound;
