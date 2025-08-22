type TextArea = {
  label: string;
};

export default function TextArea({ label }: TextArea) {
  return (
    <div className="w-[540px] text-xl relative">
      <label
        className="font-semibold z-10 absolute top-0  left-2 bg-white px-1"
        htmlFor={label}
      >
        {label}
      </label>

      <textarea
        className="border-2 px-3  rounded-md w-full border-gray-600  z-0  top-3 py-2 pt-4"
        name={label}
        id={label}
        rows={4}
      ></textarea>
    </div>
  );
}
