import Cookies from "js-cookie";
import Types from "./types";
import { Product } from "interfaces/interfaces";
import { AddToCartAction, RemoveFromCartAction } from "./actions";

const cartItemsStr = Cookies.get("_cart");
const parsedCartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];

export const initialState = parsedCartItems;

export type ACTIONTYPES = AddToCartAction | RemoveFromCartAction;

export const cartReducer = (state: Product[], action: ACTIONTYPES) => {
  switch (action.type) {
    case Types.addToCart:
      const cart = [...state, action.payload];
      Cookies.set("_cart", JSON.stringify(cart), { expires: 30 });
      return cart;
    case Types.removeFromCart:
      return [];
    default:
      throw new Error();
  }
};
