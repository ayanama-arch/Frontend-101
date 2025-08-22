import styled from "styled-components";

export default function Field({
  detailsVisible,
  setDetailsVisible,
  selectedNumber,
  setSelected,
  totalScore,
  setTotalScore,
  dice,
  setDice,
}) {
  const numbers = [1, 2, 3, 4, 5, 6];

  function detailsVisiblity() {
    if (detailsVisible == false) {
      setDetailsVisible(true);
    } else {
      setDetailsVisible(false);
    }
  }

  function diceGenerate() {
    const random = Math.floor(Math.random() * 6) + 1;
    setDice(random);
    if (dice == selectedNumber) {
      setTotalScore(totalScore + 20);
    } else {
      setTotalScore(totalScore - 2);
    }
  }
  return (
    <>
      <Container>
        <NavField>
          <div className="total_score">
            <h1>{totalScore}</h1>
            <p>Total Score</p>
          </div>
          <div className="right_nav">
            <p>You've not selected any number</p>
            <div className="bet_numbers">
              {numbers.map((value) => (
                <Box
                  className="numbers"
                  key={value}
                  isselected={value === selectedNumber}
                  onClick={() => {
                    setSelected(value);
                  }}
                >
                  {value}
                </Box>
              ))}
            </div>

            <h4>Select a Number</h4>
          </div>
        </NavField>
        <MainField>
          <div className="dice">
            <img
              src={`/images/dice/dice_${dice}.png`}
              alt="Dice"
              onClick={diceGenerate}
            />
          </div>
          <div className="play_buttons">
            <Button className="reset">Reset Score</Button>
            <Button onClick={detailsVisiblity}>Show Details</Button>
          </div>
          {detailsVisible && (
            <div className="game_rules">
              <h2>How to play dice game?</h2>
              <li>Select any number.</li>
              <li>Click on Dice Image</li>
              <li>
                If selected number is equal to dice point you score a point.
              </li>
              <li>If wrong, 2 points will be deducted</li>
            </div>
          )}
        </MainField>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const NavField = styled.nav`
  border-bottom: 2px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;

  .total_score {
    margin: 0 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .total_score h1 {
    font-size: 6rem;
  }

  .total_score p {
    font-weight: 500;
  }

  .right_nav {
    margin-right: 1em;
  }

  .right_nav h4 {
    text-align: end;
  }

  .right_nav p {
    text-align: center;
    color: transparent;
  }

  .bet_numbers {
    display: flex;
    gap: 1em;
  }
`;

const Box = styled.div`
  border: 2px solid black;
  padding: 1em 1.4em;
  font-weight: 500;
  background-color: ${(props) => (props.isselected ? "black" : "white")};
  color: ${(props) => (props.isselected ? "white" : "black")};
  border: ${(props) => (props.isselected ? "transparent" : "visible")};
`;

const MainField = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .play_buttons {
    display: flex;
    flex-direction: column;
    gap: 0.53em;
  }

  .reset {
    background-color: white;
    color: black;
    border: 2px solid black;
    transition: 0.2s ease-in-out;

    &:hover {
      color: white;
      background-color: black;
      transition: 0.2s ease-in-out;
    }
  }

  .game_rules {
    margin-top: 1em;
    background-color: #f1e7e7;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: 2px solid transparent;
  width: 220px;
  height: 44px;
  padding: 10px, 18px, 10px, 18px;
  border-radius: 5px;
  gap: 10px;
  font-size: 1.6rem;
  transition: 0.2s ease-in-out;
  float: right;

  &:hover {
    color: black;
    background-color: white;
    border: 2px solid black;
    transition: 0.2s ease-in-out;
  }
`;
