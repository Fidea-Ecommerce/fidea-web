const Input = (props) => {
  const { type, placeholder, name } = props;
  return (
    <input
      type={type}
      className="mb-2 w-full rounded-full border border-black p-3 pl-8  text-lg text-slate-700 outline-none"
      placeholder={placeholder}
      name={name}
      id={name}
    />
  );
};

export default Input;
