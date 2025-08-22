import { Formik, Form, ErrorMessage, Field } from "formik";
import { z, ZodError } from "zod";
import ErrorDisplay from "./form/ErrorDisplay";

const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "You must be at least 18 years old"),
});

const MyForm = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "", age: "" }}
      validate={(values) => {
        try {
          validationSchema.parse({
            ...values,
            age: values.age ? Number(values.age) : undefined, // Handle number conversion for age
          });
        } catch (error) {
          if (error instanceof ZodError) {
            return error.flatten().fieldErrors; // Return Zod validation errors in Formik's format
          }
          // Optionally handle other types of errors if needed
          return {};
        }
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form submitted with values:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorDisplay>
              <ErrorMessage name="name" component="div" />
            </ErrorDisplay>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorDisplay>
              <ErrorMessage name="email" component="div" />
            </ErrorDisplay>
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <Field type="text" name="age" />
            <ErrorDisplay>
              <ErrorMessage name="age" component="div" />
            </ErrorDisplay>
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
