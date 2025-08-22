import { Link } from "react-router-dom";
import Button from "../button/Button";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-around">
      <div>
        <img src="/images/dices.png" alt="Dices" />
      </div>
      <div className="flex flex-col items-end gap-3">
        <h2 className="text-8xl font-bold uppercase">Dice Game</h2>
        <Link to={"/play"}>
          <Button text="Play Now" color="text-white" background="bg-black" />
        </Link>
      </div>
    </div>
  );
}
