import React from "react";

export default function Shimmer() {
  return (
    <>
      <div className="shimmer-card">
        {Array(10)
          .fill("")
          .map((e, index) => (
            <div key={index} className="restaurant-card-shimmer"></div>
          ))}
        {/* <div className="restaurant-card-shimmer"></div>
        <div className="restaurant-card-shimmer"></div>
        <div className="restaurant-card-shimmer"></div>
        <div className="restaurant-card-shimmer"></div>
        <div className="restaurant-card-shimmer"></div>
        <div className="restaurant-card-shimmer"></div> */}
      </div>
    </>
  );
}
