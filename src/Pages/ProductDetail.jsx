import DetailSection from "../Layout/DetailProductLayout/DetailSection";
import Serupa from "../Layout/DetailProductLayout/Serupa";
import HeaderPage from "../Layout/HeaderPage";
import { Helmet } from "react-helmet";
import fidea from '../assets/fidea1.png'

const ProductDetail = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Detail</title>
        <link rel="icon" type="image/svg+xml" href={fidea} />
      </Helmet>
      <div className="h-full min-h-screen bg-[#EBEBEB] pt-20 lg:pt-24">
        <HeaderPage></HeaderPage>
        <DetailSection></DetailSection>
        <Serupa></Serupa>
      </div>
    </>
  );
};

export default ProductDetail;
