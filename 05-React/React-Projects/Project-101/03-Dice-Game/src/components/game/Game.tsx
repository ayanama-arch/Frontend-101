import GameStat from "./GameStat";
import PlayGround from "./PlayGround";

export default function Game() {
  return (
    <div className="mx-auto h-screen w-[1280px]">
      <GameStat />
      <PlayGround />
    </div>
  );
}
