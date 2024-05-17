const Navtab = ({ custom }) => {
  const Navs = [
    { id: 1, title: "Dummy Plant" },
    { id: 2, title: "Meja & Kursi" },
    { id: 3, title: "Perabotan Dapur" },
  ];
  return (
    <div
      className={`  flex w-fit items-center gap-5 text-sm sm:ml-10 sm:gap-10  ${custom}`}
    >
      {Navs.map((nav) => (
        <div key={nav.id} className="flex w-fit items-center justify-center">
          <button className="w-fit text-sm font-bold text-black">
            {nav.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Navtab;
