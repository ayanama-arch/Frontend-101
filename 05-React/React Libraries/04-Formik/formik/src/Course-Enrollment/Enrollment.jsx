import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../Formik-Forms/FormikControl";

const Enrollment = () => {
  const dropdownOptions = [
    { key: "Select your course", value: "" },
    { key: "React", value: "react" },
    { key: "Angular", value: "angular" },
    { key: "Vue", value: "vue" },
  ];

  const checkboxOptions = [
    { key: "HTML", value: "html" },
    { key: "CSS", value: "css" },
    { key: "Javascript", value: "javascript" },
  ];

  const initialValues = {
    email: "",
    bio: "",
    course: "",
    skills: [],
    courseDate: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Format").required("Required"),
    bio: Yup.string().required("Required"),
    course: Yup.string().required("Required"),
    courseDate: Yup.date().required("Required").nullable(),
  });

  const onSubmit = (value) => console.log("Form Data: ", value);
  return (
    <div>
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
            <FormikControl control="textarea" label="Bio" name="bio" />
            <FormikControl
              control="select"
              label="Coruse"
              name="course"
              options={dropdownOptions}
            />
            <FormikControl
              control="checkbox"
              label="Your Skillset"
              name="skills"
              options={checkboxOptions}
            />
            <FormikControl
              control="date"
              label="Course Date"
              name="courseDate"
            />
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Enrollment;
