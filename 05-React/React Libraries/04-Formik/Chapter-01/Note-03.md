# Reusable Formik Components

- Create FormikContainer

```jsx
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

function FormikContainer() {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
  });
  const onSubmit = (values) => console.log("Form data: ", values);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
```

- Create Formik Control

```jsx
import React from "react";
import Input from "./Input";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
    case "select":
    case "radio":
    case "date":
    default:
      return null;
  }
  return <div>FormikControl</div>;
};

export default FormikControl;
```

- Create Form Element

```jsx
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
```

## Date in Formik

package: `react-datepicker`
