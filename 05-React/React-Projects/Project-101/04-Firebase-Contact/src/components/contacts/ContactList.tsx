import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

import Contact from "./Contact";

export type ContactType = {
  id: string;
  name: string;
  email: string;
};

type ContactList = ContactType[];
type ModalProp = {
  isModalVisible: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export default function ContactList({
  isModalVisible,
  onClose,
  onOpen,
}: ModalProp) {
  const [contacts, setContacts] = useState<ContactList>([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactSnapshot = await getDocs(contactsRef);
        const contactList: ContactList = contactSnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<ContactType, "id">;
          return {
            id: doc.id,
            ...data,
          } as ContactType;
        });
        setContacts(contactList);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getContacts();
  }, []);

  return (
    <div className="mx-auto w-11/12">
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          isModalVisible={isModalVisible}
          onClose={onClose}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
