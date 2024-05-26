import { FaBoxes, FaShoppingCart } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import fidea from '../assets/fidea1.png'

function PageNotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Page Not Found</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-[#EBEBEB] py-48">
        <div className="flex flex-col">
          {/* Notes */}

          {/* Error Container */}
          <div className="flex flex-col items-center">
            <div className="text-7xl font-bold text-greenprime">404</div>
            <div className="mt-10 text-3xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
              This page does not exist
            </div>
            <div className="mt-8 text-sm font-medium text-gray-400 md:text-xl lg:text-2xl">
              The page you are looking for could not be found.
            </div>
          </div>

          {/* Continue With */}
          <div className="mt-48 flex flex-col">
            <div className="font-bold uppercase text-gray-400">Continue With</div>
            <div className="mt-5 flex flex-col items-stretch">
              {/* Nav Item #1 */}
              <div className="group flex flex-row border-t-2 border-slate-400 px-4 py-8 transition-all delay-100 duration-200 hover:cursor-pointer">
                {/* Nav Icon */}
                <div className="rounded-xl bg-greenprime px-3 py-2 md:py-4">
                  <GoHomeFill
                    className="self-center justify-self-center"
                    size={40}
                    color="white"
                  />
                </div>
                {/* Text */}
                <div className="flex grow flex-col pl-5 pt-2">
                  <Link
                    to={"/"}
                    className="text-sm font-bold group-hover:underline md:text-lg lg:text-xl"
                  >
                    Home Page
                  </Link>
                  <div className="md:text-md text-sm font-semibold text-gray-400 transition-all delay-100 duration-200 group-hover:text-gray-500 lg:text-lg">
                    Mulai dari sini
                  </div>
                </div>
                {/* Chevron */}
              </div>

              {/* Nav Item #2 */}
              <div className="group flex flex-row border-t-2 border-slate-400 px-4 py-8 transition-all delay-100 duration-200 hover:cursor-pointer">
                {/* Nav Icon */}
                <div className="rounded-xl bg-greenprime px-3 py-2 md:py-4">
                  <FaBoxes size={40} color="white" />
                </div>
                {/* Text */}
                <Link to={"/products"} className="flex grow flex-col pl-5 pt-2">
                  <div className="text-sm font-bold group-hover:underline md:text-lg lg:text-xl">
                    Products
                  </div>
                  <div className="md:text-md text-sm font-semibold text-gray-400 transition-all delay-100 duration-200 group-hover:text-gray-500 lg:text-lg">
                    Lihat produk unggulan kami
                  </div>
                </Link>
                {/* Chevron */}
              </div>

              {/* Nav Item #3 */}
              <div className="group flex flex-row border-t-2 border-slate-400 px-4 py-8 transition-all delay-100 duration-200 hover:cursor-pointer">
                {/* Nav Icon */}
                <div className="rounded-xl bg-greenprime px-3 py-2 md:py-4">
                  <FaShoppingCart size={40} color="white" />
                </div>
                {/* Text */}
                <Link className="flex grow flex-col pl-5 pt-2">
                  <Link
                    to={"/cart"}
                    className="text-sm font-bold group-hover:underline md:text-lg lg:text-xl"
                  >
                    Cart
                  </Link>
                  <div className="md:text-md text-sm font-semibold text-gray-400 transition-all delay-100 duration-200 group-hover:text-gray-500 lg:text-lg">
                    Periksa kembali keranjangmu
                  </div>
                </Link>
                {/* Chevron */}
              </div>

              {/* Nav Item #4 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
