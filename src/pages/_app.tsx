import "../styles/globals.scss";
import { useEffect, useReducer, useState } from "react";
import apolloClient from "lib/apolloClient";
import type { AppProps } from "next/app";
import PageLayout from "components/PageLayout/PageLayout";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { cartReducer } from "reducers/cart/reducer";
import Types from "reducers/cart/types";
import { GET_PRODUCTS_BY_SLUGS } from "api/queries";
import { CookieCart, CartProduct } from "interfaces";
import Cookies from "js-cookie";

const cartItems = Cookies.get("_cart");

const parsedCartItems = cartItems && JSON.parse(cartItems);
const slugs =
  parsedCartItems &&
  parsedCartItems.reduce((slugs: string[], item: CookieCart) => {
    return [...slugs, item.slug];
  }, []);

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartVisibility, setCartVisibilty] = useState(false);

  const appendTotalItemsField = (products: CartProduct[]) => {
    return products.map((product: CartProduct, i) => {
      return {
        ...product,
        totalItems: parsedCartItems[i].totalItems
          ? parsedCartItems[i].totalItems
          : 1
      };
    });
  };

  const toggleCartVisibility = () => {
    setCartVisibilty(!cartVisibility);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (parsedCartItems) {
        const { data } = await apolloClient.query({
          query: GET_PRODUCTS_BY_SLUGS,
          variables: { slugs: slugs }
        });

        const products = data?.products?.nodes;

        dispatch({
          type: Types.bulkAdd,
          payload: products && appendTotalItemsField(products)
        });
      }
    };

    fetchCartProducts();
  }, []);

  return (
    <CartItemsContext.Provider
      value={{
        cart,
        dispatch
      }}
    >
      <CartVisibilityContext.Provider
        value={{
          cartVisibility,
          toggleCartVisibility
        }}
      >
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </CartVisibilityContext.Provider>
    </CartItemsContext.Provider>
  );
}

export default MyApp;
