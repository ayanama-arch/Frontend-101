import styled from "styled-components";

const HomePage = ({ setHomeVisible }) => {
  function handleGame() {
    setHomeVisible(true);
  }
  return (
    <>
      <Container>
        <div className="image">
          <img src="/images/dices.png" alt="Dices" />
        </div>
        <div className="content">
          <h1>DICE GAME</h1>
          <Button onClick={handleGame}>Play Now</Button>
        </div>
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .content h1 {
    font-size: 9.6rem;
    white-space: nowrap;
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
