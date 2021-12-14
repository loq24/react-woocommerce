import React from "react";
import { ACTIONTYPES } from "reducers/cart/reducer";
import { Product } from "interfaces";

const CartContext = React.createContext<{
  dispatch: React.Dispatch<ACTIONTYPES>;
  cart: Product[];
}>({
  dispatch: () => null,
  cart: []
});

export default CartContext;
