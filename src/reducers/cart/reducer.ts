import Cookies from "js-cookie";
import Types from "./types";
import { CartProduct, CookieCart } from "interfaces";
import {
  AddToCartAction,
  RemoveSingleItemAction,
  BulkAddAction,
  RemoveWholeProduct
} from "./actions";

const cartItemsStr = Cookies.get("_cart");
const parsedCartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];

export const initialState = parsedCartItems;

export type ACTIONTYPES =
  | AddToCartAction
  | RemoveSingleItemAction
  | RemoveWholeProduct
  | BulkAddAction;

export const cartReducer = (state: CartProduct[], action: ACTIONTYPES) => {
  switch (action.type) {
    case Types.bulkAdd:
      return action.payload;
    case Types.addToCart:
      let cart;
      if (
        state.some(
          (product: CartProduct) => product.slug === action.payload.slug
        )
      ) {
        cart = state.map((product: CartProduct) => {
          if (action.payload.slug === product.slug) {
            const totalItems = product.totalItems ? product.totalItems : 1;
            return {
              ...product,
              price:
                "$" +
                (
                  parseFloat(product.price.slice(1)) +
                  parseFloat(product.price.slice(1)) / totalItems
                ).toFixed(2),
              totalItems: totalItems + 1
            };
          }
          return product;
        });
      } else {
        cart = [...state, { ...action.payload, totalItems: 1 }];
      }

      updateCookie(cart);
      return cart;

    case Types.removeSingleItem:
      const slug = action.payload;

      const newCart = state.reduce(
        (items: CartProduct[], item: CartProduct) => {
          if (item.slug === slug && item.totalItems !== 1 && item.totalItems) {
            return [
              ...items,
              {
                ...item,
                price:
                  "$" +
                  (
                    parseFloat(item.price.slice(1)) -
                    parseFloat(item.price.slice(1)) / item.totalItems
                  ).toFixed(2),
                totalItems: item.totalItems - 1
              }
            ];
          }
          if (item.slug !== slug) {
            return [...items, item];
          }
          return items;
        },
        []
      );

      updateCookie(newCart);
      return newCart;

    case Types.removeWholeProduct:
      const _slug = action.payload;

      const _newCart = state.reduce(
        (items: CartProduct[], item: CartProduct) => {
          if (item.slug !== _slug) {
            return [...items, item];
          }
          return items;
        },
        []
      );

      updateCookie(_newCart);
      return _newCart;

    default:
      throw new Error();
  }
};

const updateCookie = (cartItems: CartProduct[]) => {
  const cookieProducts =
    cartItems.length > 0 &&
    cartItems.reduce((cookieItems: CookieCart[], item: CartProduct) => {
      if (!cookieItems.some((cookieItem) => cookieItem.slug === item.slug)) {
        return [
          ...cookieItems,
          { slug: item.slug, totalItems: item.totalItems }
        ];
      }
      return cookieItems;
    }, []);
  Cookies.set("_cart", JSON.stringify(cookieProducts), { expires: 30 });
};
