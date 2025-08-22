import { IoMdContact } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../config/firebase";
import Modal from "./Modal";
import { useState } from "react";
import { toast } from "react-toastify";

const Body = ({ contact }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // Deleting contacts
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(database, "contacts", id));
      toast.success("Deleted Succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div
        className="flex bg-yellow-200 rounded-md mt-2 text-black justify-between text-xl items-center"
        key={contact.id}
      >
        <div className="">
          <IoMdContact className="text-orange-500 text-5xl" />
        </div>
        <div className="">
          <h2>{contact.name}</h2>
          <p>{contact.email}</p>
        </div>
        <div className="flex gap-1 justify-between w-max items-center">
          <FaUserEdit onClick={openModal} className="text-4xl cursor-pointer" />
          <MdDelete
            onClick={() => deleteContact(contact.id)}
            className="text-4xl text-violet-900 cursor-pointer"
          />
        </div>
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            update={true}
            contact={contact}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Body;
