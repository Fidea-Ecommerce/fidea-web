import ExpandInfo from "../../Components/ExpandInfo";

const MoreInfoProduct = (prop) => {
  let { description } = prop

  return (
    <div className="pb-10">
      <ExpandInfo description={description}>Rincian Produk</ExpandInfo>

      <ExpandInfo>Ukuran</ExpandInfo>

      <ExpandInfo>Review</ExpandInfo>
    </div>
  );
};

export default MoreInfoProduct;
