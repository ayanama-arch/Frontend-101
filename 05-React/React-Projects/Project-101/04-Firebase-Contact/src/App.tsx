import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";

export default function App() {
  return (
    <div className="bg-bgray h-screen w-[500px] p-2 px-4">
      <Navbar />
      <Search />
    </div>
  );
}
