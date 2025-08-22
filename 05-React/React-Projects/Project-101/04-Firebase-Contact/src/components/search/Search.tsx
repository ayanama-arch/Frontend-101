import { Formik, Field, Form } from "formik";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import * as yup from "yup";

type SearchContact = {
  query: string;
};

const initialValues: SearchContact = { query: "" };

const validationSchema = yup.object({
  query: yup.string(),
});

export default function Search() {
  const handleSubmit = (value: SearchContact) => {
    console.log(value.query);
  };
  return (
    <div className="flex items-center justify-between text-3xl text-white">
      <div className="absolute px-2 py-2">
        <FaSearch />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="w-96">
            <Field
              className="bg-bgray w-full rounded-lg border-2 py-3 pl-12 text-xl outline-none"
              id="query"
              name="query"
              type="text"
              placeholder="Search Contact"
            />
          </div>
        </Form>
      </Formik>
      <IoIosAddCircle className="cursor-pointer text-6xl" />
    </div>
  );
}
