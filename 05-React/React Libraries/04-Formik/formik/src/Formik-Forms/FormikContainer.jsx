import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const selectOption = [
  { key: "Select an option", value: "" },
  { key: "Option-1", value: "option-1" },
  { key: "Option-2", value: "option-2" },
  { key: "Option-3", value: "option-3" },
  { key: "Option-4", value: "option-4" },
];

const radioOptions = [
  { key: "Option-1", value: "option-1" },
  { key: "Option-2", value: "option-2" },
  { key: "Option-3", value: "option-3" },
];

const checkBoxOptions = [
  { key: "Option-1", value: "option-1" },
  { key: "Option-2", value: "option-2" },
  { key: "Option-3", value: "option-3" },
];

function FormikContainer() {
  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
    checkboxOption: Yup.array().required("Required"),
    birthDate: Yup.date().required("Required").nullable(),
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
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikControl
            label="Select a topic"
            name="selectOption"
            control="select"
            options={selectOption}
          />
          <FormikControl
            control="radio"
            label="Radio Topic"
            name="radioOption"
            options={radioOptions}
          />
          <FormikControl
            control="checkbox"
            label="Checkbox topicx"
            name="checkboxOption"
            options={checkBoxOptions}
          />
          <FormikControl control="date" label="Pick a date" name="birthDate" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
