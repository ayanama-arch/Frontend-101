import { ErrorMessage, Field } from "formik";

const Input = ({ label, name, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} />
      <ErrorMessage name={name} />
    </div>
  );
};

export default Input;
