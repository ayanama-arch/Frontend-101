export default function Navbar() {
  return (
    <nav className="w-11/12 flex justify-between mx-auto h-20 items-center border-b-2 ">
      <div>
        <img className="cursor-pointer " src="./images/logo.png" alt="logo" />
      </div>
      <ul className="flex gap-4 uppercase font-semibold text-gray-600 text-xl">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Contact</li>
        <li className="cursor-pointer">Services</li>
      </ul>
    </nav>
  );
}
