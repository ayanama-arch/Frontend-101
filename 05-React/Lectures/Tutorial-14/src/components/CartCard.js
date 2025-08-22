// import { IMG_CDN_URL } from "../constant";
import { IMG_CDN_URL } from "../constant";

const CartCard = ({ item }) => {
  console.log("item", item.card);
  return (
    <div className="menu-card" key={item?.card?.info?.id}>
      <img
        style={{ width: "320px" }}
        src={IMG_CDN_URL + item?.card?.info?.imageId}
        alt=""
      />
      <li>{item?.card?.info?.name}</li>
      <li>{item?.card?.info?.description}</li>
      <li>{item?.card?.info?.ratings?.aggregatedRating.rating}</li>
      <li>{item?.card?.info?.price / 100} Rs</li>
      <li>hello</li>
      <button onClick={() => addFoodItem(item)}>Add +</button>
    </div>
  );
};

export default CartCard;
