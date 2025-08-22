import { useContext } from "react";
import { GameContext } from "../context";

export default function Rules() {
  const gameContext = useContext(GameContext);

  if (!gameContext) return <h2>Loading!!</h2>;
  const { isRulesVisible } = gameContext;
  console.log(isRulesVisible);
  return (
    isRulesVisible && (
      <div className="bg-orange-100 px-4 py-2 text-lg font-semibold">
        <h2 className="mb-1 text-lg font-bold"> How to play dice game?</h2>
        <ul>
          <li>Select any number Click on dice image after</li>
          <li>
            click on dice if selected number is equal to dice number you will
            get same point as dice
          </li>
          <li>if you get wrong guess then 2 point will be dedcuted</li>
        </ul>
      </div>
    )
  );
}
