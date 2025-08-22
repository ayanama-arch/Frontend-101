import { Field, Form, Formik, FieldArray, FastField } from "formik";

const FormData = () => {
  return (
    <div>
      <Formik
        initialValues={{
          phoneNumbers: [""],
        }}
        onSubmit={(value) => {
          console.log("Submitted value: ", value);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="form-control">
                <FieldArray name="phoneNumbers">
                  {(fieldArrayProps) => {
                    console.log("props: ", fieldArrayProps);
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { phoneNumbers } = values;

                    return (
                      <div>
                        {phoneNumbers.map((number, index) => (
                          <div key={index}>
                            <Field name={`phoneNumbers[${index}]`} />
                            {index == 0 ? (
                              <button disabled onClick={() => remove(index)}>
                                -
                              </button>
                            ) : (
                              <button onClick={() => remove(index)}>-</button>
                            )}
                            <button onClick={() => push("")}>+</button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <button type="submit" disabled={formik.isValid}>
                Submit
              </button>
              <button type="submit" disabled={formik.dirty}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormData;
