import { Field, Formik, Form } from "formik";
import { useState } from "react";

const initialValues = {
  firstName: "",
  lastName: "",
};

const savedValue = {
  firstName: "Ayan",
  lastName: "Khan",
};

const NewForm = () => {
  const [formValue, setFormValue] = useState(null);

  return (
    <Formik
      initialValues={formValue || initialValues}
      enableReinitialize
      onSubmit={(value) => {
        console.log("form data: ", value);
      }}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" id="firstName" />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" id="lastName" />
        </div>
        <button type="submit">Submit</button>
        <button type="submit" onClick={() => setFormValue(savedValue)}>
          Load Form Data
        </button>
      </Form>
    </Formik>
  );
};

export default NewForm;
