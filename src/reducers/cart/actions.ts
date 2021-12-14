import Types from "./types";
import { Product } from "interfaces";

export interface BulkAddAction {
  type: Types.bulkAdd;
  payload: Product[];
}

export interface AddToCartAction {
  type: Types.addToCart;
  payload: Product;
}

export interface RemoveSingleItemAction {
  type: Types.removeSingleItem;
  payload: string;
}

export interface RemoveWholeProduct {
  type: Types.removeWholeProduct;
  payload: string;
}
