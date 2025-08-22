import Navigation from "./components/Navigation";
import Body from "./components/Body";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { database } from "./config/firebase";
import Modal from "./components/Modal";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NoContacts } from "./components/NoContacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const getContacts = async () => {
    try {
      const contactsRef = collection(database, "contacts");
      onSnapshot(contactsRef, (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
        return contactLists;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const searchContact = (name) => {
    const contactsRef = collection(database, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(name.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <div className="w-1/3 bg-gray-700 text-white min-h-screen">
      <div className="w-10/12 m-auto">
        <Navigation openModal={openModal} searchContact={searchContact} />
        {contacts.length == 0 ? (
          <NoContacts />
        ) : (
          contacts.map((contact) => <Body key={contact.id} contact={contact} />)
        )}
        {isModalOpen && (
          <Modal
            update={false}
            add={true}
            closeModal={closeModal}
            contacts={contacts}
            onClose={closeModal}
          />
        )}
        <ToastContainer position="bottom-left" />
      </div>
    </div>
  );
};

export default App;
