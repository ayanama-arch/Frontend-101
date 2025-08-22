export default function Navbar() {
  return (
    <nav className="flex justify-between w-[1440px] mx-auto text-lg font-semibold h-20  items-center">
      <div>
        <img
          className="cursor-pointer"
          src="./images/brand_logo.png"
          alt="logo"
        />
      </div>
      <div>
        <ul className="flex gap-4 uppercase">
          <li className="cursor-pointer">Menu</li>
          <li className="cursor-pointer">Location</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      </div>
      <div>
        <button className="bg-red-600 text-white px-4 py-1">
          <a href="/login">Login</a>
        </button>
      </div>
    </nav>
  );
}
