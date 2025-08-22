import React from "react";

type Button = {
  component: React.ReactElement;
  text: string;
  background: string;
  color: string;
};

export default function Button({ component, text, background, color }: Button) {
  return (
    <>
      <button
        className={`flex py-2 rounded-md text-2xl font-semibold items-center  w-full uppercase px-8 gap-4 justify-center ${background} ${color} border-2 border-black`}
      >
        {component} {text}
      </button>
    </>
  );
}
