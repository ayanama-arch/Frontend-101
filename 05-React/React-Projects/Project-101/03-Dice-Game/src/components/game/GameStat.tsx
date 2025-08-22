import { useContext } from "react";
import { GameContext } from "../context";

const SCORE_POINTS = [1, 2, 3, 4, 5, 6];

export default function GameStat() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return <h2>Game Context is not available</h2>;
  const { selectNumber, chooseNumber, totalScore } = gameContext;

  const handleScoreClick = (score: number) => {
    chooseNumber(score);
  };

  return (
    <section className="flex w-full items-center justify-between">
      <div className="flex flex-col items-center">
        <h2 className="text-8xl font-semibold">{totalScore}</h2>
        <h2 className="text-2xl font-semibold">Total Score</h2>
      </div>
      <div className="flex h-full w-1/2 flex-col items-end gap-4">
        <h2
          className={`text-2xl text-red-600 underline ${selectNumber && "opacity-0"}`}
        >
          You have not selected any number
        </h2>
        <div className="flex h-20 justify-end gap-4">
          {SCORE_POINTS.map((score, index) => (
            <span
              className={`flex h-20 w-20 cursor-pointer items-center justify-center border-2 border-black text-2xl font-bold ${selectNumber == score ? `bg-black text-white` : ""}`}
              key={index}
              onClick={() => handleScoreClick(score)}
            >
              <h3>{score}</h3>
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-semibold">Select a Number</h2>
      </div>
    </section>
  );
}
