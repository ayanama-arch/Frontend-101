import { useContext } from "react";
import Button from "../button/Button";
import Rules from "./Rules";
import { GameContext } from "../context";

export default function PlayGround() {
  const data = useContext(GameContext);

  if (!data) return <h2>Loading!!</h2>;

  const { diceNumber, chooseDice, chooseRulesVisibility, resetScore } = data;

  return (
    <section className="flex flex-col items-center">
      <div className="h-[250px] w-[250px]">
        <img
          className="cursor-pointer"
          onClick={chooseDice}
          src={`/images/dice/dice_${diceNumber}.png`}
          alt=""
        />
        <h2 className="text-center text-2xl font-semibold">
          Click on Dice to Roll
        </h2>
      </div>
      <div className="b-10 mb-2 mt-20 flex flex-col gap-10">
        <Button
          background="bg-white"
          color="text-black"
          text="Reset Score"
          toggleState={resetScore}
        />
        <Button
          text="Show Rules"
          color="text-white"
          background="bg-black"
          toggleState={chooseRulesVisibility}
        />
      </div>
      <Rules />
    </section>
  );
}
