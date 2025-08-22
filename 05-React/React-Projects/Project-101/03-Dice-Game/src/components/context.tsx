import { createContext, ReactNode, useState } from "react";

// Define the types for the context value
type GameContextType = {
  selectNumber: number | null;
  chooseNumber: (number: number | null) => void;
  diceNumber: number;
  chooseDice: () => void;
  isRulesVisible: boolean;
  chooseRulesVisibility: () => void;
  totalScore: number;
  resetScore: () => void;
};

// Define the props for the GameProvider component
interface GameProviderProps {
  children: ReactNode;
}

// Provide a default value for the context
const GameContext = createContext<GameContextType | null>(null);

const GameProvider = ({ children }: GameProviderProps) => {
  const [selectNumber, setSelectNumber] = useState<number | null>(null);
  const [diceNumber, setDiceNumber] = useState<number>(1);
  const [isRulesVisible, setRulesVisible] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);

  const chooseNumber = (number: number | null) => {
    setSelectNumber(number);
  };

  const chooseDice = () => {
    if (!selectNumber) return;
    const num = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(num);

    if (diceNumber == selectNumber) {
      setTotalScore((prev) => prev + 10);
    } else {
      setTotalScore((prev) => prev - 2);
    }
  };

  const chooseRulesVisibility = () =>
    setRulesVisible((prevState) => !prevState);

  const resetScore = () => setTotalScore(0);

  return (
    <GameContext.Provider
      value={{
        selectNumber,
        chooseNumber,
        diceNumber,
        chooseDice,
        isRulesVisible,
        chooseRulesVisibility,
        totalScore,
        resetScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
