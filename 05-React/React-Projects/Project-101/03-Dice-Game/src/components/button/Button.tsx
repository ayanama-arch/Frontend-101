type Button = {
  text: string;
  color: string;
  background: string;
  toggleState: () => void;
};

export default function Button({
  text,
  color,
  background,
  toggleState,
}: Button) {
  return (
    <button
      onClick={toggleState}
      className={`w-56 rounded-md border-2 border-black px-5 py-2 text-center text-xl ${color} ${background}`}
    >
      {text}
    </button>
  );
}
