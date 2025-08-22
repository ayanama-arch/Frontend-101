import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL } from "../constant";
import { clearCart } from "../../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="restaurant-intro menu-detail">
      <h1>Menu Details</h1>
      <button onClick={() => handleClearCart()}>Clear Cart</button>
      <div className="menu-card-items">
        {cartItems?.map((item) => {
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
        })}
      </div>
    </div>
  );
};

export default Cart;
