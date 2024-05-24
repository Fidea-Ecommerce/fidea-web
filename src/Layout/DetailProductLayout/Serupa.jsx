import CardCluster from "../../Components/CardCluster";

const Serupa = ({ title }) => {
  return (
    <section>
      <h1 className=" ml-8 mt-10 text-2xl font-bold lg:ml-14 lg:text-4xl">
        {" "}
        Produk Serupa
      </h1>
      <CardCluster title={title}></CardCluster>
    </section>
  );
};

export default Serupa;
