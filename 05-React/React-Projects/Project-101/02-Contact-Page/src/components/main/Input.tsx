type Input = {
  label: string;
};

export default function Input({ label }: Input) {
  return (
    <div className="w-[540px] text-xl relative">
      <label
        className="font-semibold z-10 absolute top-[-14px] left-2 bg-white px-1"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className={`border-2 px-3  rounded-md w-full border-gray-600  z-0  py-2 pt-4 `}
        type="text"
      />
    </div>
  );
}
