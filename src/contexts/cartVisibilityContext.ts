import React from "react";

interface CartVisibilityContextProps {
  cartVisibility: boolean;
  toggleCartVisibility: () => void;
}

const CartVisibilityContext = React.createContext<CartVisibilityContextProps>({
  cartVisibility: false,
  toggleCartVisibility: () => null
});

export default CartVisibilityContext;
