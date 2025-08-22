# Formik

## Render Prop Patterns

```jsx
<div>
  <label htmlFor="address">Address</label>
  <Field name="address">
    {(props) => {
      const { field, form, meta } = props;
      console.log("render propss: ", props);
      return (
        <div>
          <input type="text" id="address" {...field} />
          {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </div>
      );
    }}
  </Field>
</div>
```

## Nested Objects

```jsx
import { Field, Form, Formik } from "formik";

const FormData = () => {
  return (
    <div>
      <Formik
        initialValues={{
          social: {
            facebook: "",
            twitter: "",
          },
        }}
        onSubmit={(value) => {
          console.log("Submitted value: ", value);
        }}
      >
        <Form>
          <div>
            <label htmlFor="facebook">Facebook Profile</label>
            <Field type="text" id="facebook" name="social.facebook" />
          </div>
          <div>
            <label htmlFor="twitter">Twitter Profile</label>
            <Field type="text" id="twitter" name="social.twitter" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormData;
```

## Array

```jsx
<Formik
  initialValues={{
    phoneNumbers: ["", ""],
  }}
  onSubmit={(value) => {
    console.log("Submitted value: ", value);
  }}
>
  <Form>
    <div className="form-control">
      <label htmlFor="primary-phone">Primary phone number</label>
      <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
    </div>
    <div className="form-control">
      <label htmlFor="secondary-phone">Secondary phone number</label>
      <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
    </div>
    <button type="submit">Submit</button>
  </Form>
</Formik>
```

## FieldArray Components

```jsx
import { Field, Form, Formik, FieldArray } from "formik";

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
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormData;
```

## FastField Components

When you don't want to rerender the whole form when somethign changes

```jsx
<FastField name="address">
  {(props) => {
    const { field, form, meta } = props;
    console.log("render propss: ", props);
    return (
      <div>
        <input type="text" id="address" {...field} />
        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      </div>
    );
  }}
</FastField>
```

## When does validation Run

pass `validateOnChange={false}` or `validateOnBlur={false}` inside Formik to manually handle validation.

```jsx
<Formik
    initialValues={initialValues}
    validateOnChange={false}
    validateOnBlur={false}
>
```

## Field Level Validation

```jsx
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

// Inside Formik
<Field id="comments" name="comments" validate={validateComments} />;
<ErrorMessage name="comments" />;
```

## Manually Triggering Validation

Check Docs

## Disabling Submit button

Two scenarios:-

1. Validity of form state
2. Form submission in progress

### Validity of form state

If you want to run validation as soon as form mounts sets `validateOnMount` in Formik to run validation.

``jsx
<button type='submit' disabled={!(formik.dirty && formik.isValid)} >Submit</button>

### Form submission in progress

```jsx
<Formik
    const onSubmit=(values,onSubmitProps)=>{
        console.log('form data',vlaues)
        onSubmitProps.setSubmitting(false)
    }
>
<button disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
</Formik>
```

## Load Saved Data

```jsx
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
      // This option allows to re-initialize data after loading the first
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
```

## Reset Form Data

```jsx
// First Method
<button type="reset">Reset</butotn>

// second Method
// Inside onSubmit function of formik
onSubmitProps.resetForm()
```
