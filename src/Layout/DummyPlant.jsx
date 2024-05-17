import Card from "../Components/Card";
import ContohDataProduk from "../ContohDataProduk.json";

const DummyPlant = () => {
  const products = ContohDataProduk;
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-16 px-8 py-8 md:grid-cols-2 xl:grid-cols-4 ">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DummyPlant;
