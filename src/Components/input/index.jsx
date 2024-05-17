import Input from "./Input";
import Label from "./Label";

const InputForm = (props) => {
  const { label, type, name, placeholder } = props;
  return (
    <div className="mt-3 ">
      <Label htmlfor={name}>{label}</Label>
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default InputForm;
