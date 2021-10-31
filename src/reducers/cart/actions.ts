import Types from "./types";
import { Product } from "interfaces/interfaces";

export interface AddToCartAction {
  type: Types.addToCart;
  payload: Product;
}

export interface RemoveFromCartAction {
  type: Types.removeFromCart;
  payload: string;
}
