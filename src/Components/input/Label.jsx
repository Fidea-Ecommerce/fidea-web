const Label = (props) => {
  const { htmlfor, children } = props;
  return (
    <label
      htmlFor={htmlfor}
      className="my block  text-sm font-bold text-slate-700"
    >
      {children}
    </label>
  );
};

export default Label;
