import HomePage from "./components/Home";
import Field from "./components/Field";
import { useState } from "react";

function App() {
  const [homeVisible, setHomeVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedNumber, setSelected] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [dice, setDice] = useState(6);

  return (
    <>
      {!homeVisible && <HomePage setHomeVisible={setHomeVisible} />}
      {homeVisible && (
        <Field
          detailsVisible={detailsVisible}
          setDetailsVisible={setDetailsVisible}
          selectedNumber={selectedNumber}
          setSelected={setSelected}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          dice={dice}
          setDice={setDice}
        />
      )}
    </>
  );
}

export default App;
