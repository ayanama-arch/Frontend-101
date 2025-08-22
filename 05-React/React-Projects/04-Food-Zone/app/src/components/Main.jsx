import styled from "styled-components";
import FoodCard from "./foodCard";

export default function Main({ foodData }) {
  return (
    <>
      <MainContainer>
        {foodData?.map((data) => (
          <FoodCard foodData={data} key={data?.name} />
        ))}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url("/bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 85vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2em;
  padding-top: 2em;
`;
