import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { database } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

const Modal = ({ closeModal, update, contact, add, onClose }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(database, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Added Succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Update Contact
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(database, "contacts", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Updated Succesfully");
    } catch (error) {
      console.log(error);
    }
  };
  return createPortal(
    <div className="absolute top-0">
      <div className="bg-white relative top-[120px] left-[35px] z-20 h-[260px] w-[380px] text-black p-2">
        <AiOutlineClose
          onClick={closeModal}
          className="cursor-pointer text-2xl m-2 hover:bg-orange-100 "
        />
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            update
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            update ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="m-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                placeholder="Name"
                className="h-10 border border-black rounded-md p-2"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>

              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="h-10 border border-black rounded-md p-2"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-500 mt-2 rounded-md text-white px-2 py-1 float-end hover:bg-orange-400"
            >
              {add ? "Add Contact" : "Update Contact"}
            </button>
          </Form>
        </Formik>
      </div>
      <div className="absolute top-0 z-0 m-auto h-screen w-[420px] backdrop-blur"></div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
