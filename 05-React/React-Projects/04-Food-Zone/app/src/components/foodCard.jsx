import React from "react";
import { BASE_URL } from "../App";
import styled from "styled-components";

export default function FoodCard({ foodData }) {
  const IMG_URL = BASE_URL + foodData.image;
  return (
    <CardContainer>
      <div className="card_image">
        <img src={IMG_URL} alt="card_image" />
      </div>
      <div className="card_info">
        <h2>{foodData.name}</h2>
        <p>{foodData.text}</p>
        <button>${foodData.price.toFixed(2)}</button>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 340px;
  height: 167px;

  display: flex;
  color: white;
  padding: 0.5em 1em;
  gap: 0.5em;
  border: 1px solid #bbbbbb;

  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.0447917) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.1842px);
  border-radius: 20px;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: url(.png),
      radial-gradient(
        90.16% 143.01% at 15.32% 21.04%,
        rgba(165, 238, 255, 0.144) 0%,
        rgba(110, 190, 244, 0.11) 77.08%,
        rgba(70, 144, 213, 0) 100%
      );
    transition: 0.2s ease-in-out;
  }

  .card_info {
    margin: 0.5em 0;
  }
  .card_info h2 {
    font-weight: 500;
    margin-bottom: 0.7em;
    font-size: 1.6rem;
  }

  .card_info p {
    font: 400;
    font-size: 1.3rem;
    margin-bottom: 1em;
  }

  .card_info button {
    color: white;
    background-color: red;
    border-radius: 5px;
    border: none;
    padding: 0.4em 0.6em;
    float: right;
    cursor: pointer;
  }
`;
