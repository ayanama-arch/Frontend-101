import { ErrorMessage, Field } from "formik";
import React from "react";

const CheckBox = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
};

export default CheckBox;
