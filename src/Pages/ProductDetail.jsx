import DetailSection from "../Layout/DetailProductLayout/DetailSection";
import Serupa from "../Layout/DetailProductLayout/Serupa";
import HeaderPage from "../Layout/HeaderPage";

const ProductDetail = ({ setTitle, title }) => {
  return (
    <div className="h-full min-h-screen bg-[#EBEBEB] pt-20 lg:pt-24">
      <HeaderPage></HeaderPage>
      <DetailSection setTitle={setTitle}></DetailSection>
      <Serupa title={title}></Serupa>
    </div>
  );
};

export default ProductDetail;
