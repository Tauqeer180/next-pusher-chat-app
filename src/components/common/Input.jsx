import { Field } from "formik";
import { Inputdisplay } from "./constant";

function InputLabel({ children, ...rest }) {
  return (
    <label
      {...rest}
      // htmlFor="empleado_id"
      className=" capitalize text-lg text- font-light  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] start-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
    >
      {children}
    </label>
  );
}

const Input = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  errors,
  autocomplete,
  ...rest
}) => {
  // const [field, meta, helpers] = useField(props.name);

  return (
    <div>
      <div className=" relative">
        {label && <InputLabel htmlFor={name}>{label} </InputLabel>}
        <Field
          as={type == "textarea" ? "textarea" : "input"}
          type={type || "text"}
          name={name}
          id={name}
          placeholder={placeholder || ""}
          value={value}
          className={`${Inputdisplay}  ${errors[name] && "border-red-600"} `}
          onChange={onChange}
          autoComplete={autocomplete || "off"}
          {...rest}
        />
      </div>
      {errors[name] && (
        <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
      )}
    </div>
  );
};

export { InputLabel, Input };
