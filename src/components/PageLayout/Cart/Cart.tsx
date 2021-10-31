import { useContext } from "react";
import CartContext from "contexts/cartContext";
import ItemList from "./ItemList";

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  console.log("cart", cart);

  return (
    <div className="fixed w-96 h-screen right-0 z-30 bg-black top-14 p-5">
      <div className="relative w-full h-full">
        <h4 className="text-3xl text-white font-medium mb-8">My Cart</h4>
        <ItemList products={cart} />
      </div>
    </div>
  );
};

export default Cart;
