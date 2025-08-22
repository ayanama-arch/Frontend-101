import { IoMdContact } from "react-icons/io";

export const NoContacts = () => {
  return (
    <div className="flex gap-1 flex-col items-center mt-5">
      <IoMdContact className="text-5xl text-yellow-700" />
      <h2 className="text-xl">No Contacts</h2>
    </div>
  );
};
