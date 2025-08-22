import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

const Navigation = ({ openModal,searchContact }) => {
  function handleChange(e) {
    searchContact(e.target.value)
  }
  return (
    <>
      <div className="flex bg-white px-5 py-3 rounded-md text-black font-semibold text-2xl gap-2 justify-center">
        <div>
          <img src="/firebase.svg" alt="logo" />
        </div>
        <h1>Firebase Contact App</h1>
      </div>
      <div className="flex mt-2 border-white relative">
        <div className="w-11/12">
          <IoSearch className="absolute text-2xl mt-2 ml-2" />
          <input
            type="text"
            className="w-full bg-gray-700 border-white border-x border-y rounded-md px-9 py-2 focus:outline-none"
            onChange={handleChange}
            placeholder="Search Contact"
          />
        </div>
        <IoAdd
          className="text-5xl text-black bg-white rounded-full ml-2"
          onClick={openModal}
        />
      </div>
    </>
  );
};

export default Navigation;
