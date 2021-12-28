import React, { useContext, useEffect, useState } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import ItemList from "./ItemList";
import classNames from "classnames";
import { CartProduct } from "interfaces";

const Cart = () => {
  const [checkout, setCheckout] = useState(false);
  const { cart } = useContext(CartItemsContext);
  const { cartVisibility, toggleCartVisibility } = useContext(
    CartVisibilityContext
  );

  const subTotal = cart
    .reduce((total, item: CartProduct) => {
      return (total += item.totalItems
        ? parseFloat(item.price.slice(1)) * item.totalItems
        : parseFloat(item.price.slice(1)));
    }, 0)
    .toFixed(2);

  const changeCheckoutText = () => {
    setCheckout(!checkout);
  };

  useEffect(() => {
    if (cartVisibility) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cartVisibility]);

  return (
    <>
      <div
        onClick={toggleCartVisibility}
        className={classNames(
          "fixed w-screen h-screen opacity-30 bg-black z-20",
          { hidden: !cartVisibility }
        )}
      ></div>
      <div
        className={classNames(
          "fixed sm:w-96 w-full h-screen right-0 z-30 bg-black top-14 overflow-hidden",
          { hidden: !cartVisibility },
          { "flex flex-col items-center justify-center": cart.length === 0 }
        )}
      >
        {cart.length > 0 ? (
          <div className="relative h-full">
            <div className="relative w-full h-2/3 p-5 overflow-y-auto top-0">
              <h4 className="text-3xl text-white font-medium mb-8">My Cart</h4>
              {cart && <ItemList products={cart} />}
            </div>
            <div className="w-full sticky h-80 bg-black -ml-2.5 border-t border-white p-6 pl-8 bottom-0">
              <div className="flex flex-wrap flex-row justify-between mb-4">
                <span className="text-white text-sm">Subtotal</span>
                <span className="text-white text-sm">${subTotal}</span>
              </div>
              <div className="flex flex-wrap flex-row justify-between mb-4">
                <span className="text-white text-sm">Taxes</span>
                <span className="text-white text-sm">
                  Calculated at checkout
                </span>
              </div>
              <div className="flex flex-wrap flex-row justify-between mb-4">
                <span className="text-white text-sm">Shipping</span>
                <span className="text-white text-sm">FREE</span>
              </div>
              <div className="w-full h-px bg-gray-500 mb-4"></div>
              <div className="flex flex-wrap flex-row justify-between mb-4">
                <span className="text-white text-sm font-semibold">Total</span>
                <span className="text-white text-sm font-semibold">
                  ${subTotal}
                </span>
              </div>
              <button
                className=" outline-none bg-white border-0 py-4 w-full text-sm uppercase hover:bg-gray-300 transition duration-500 ease-in-out"
                onClick={changeCheckoutText}
              >
                {checkout ? `Available soon!` : `Proceed To Checkout`}
              </button>
            </div>
          </div>
        ) : (
          <h4 className=" text-white text-center font-medium mb-8 text-base">
            Your cart is empty.
          </h4>
        )}
      </div>
    </>
  );
};

export default Cart;
