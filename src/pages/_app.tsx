import "../styles/globals.scss";
import React, { useReducer } from "react";
import type { AppProps } from "next/app";
import PageLayout from "components/PageLayout/PageLayout";
import CartContext from "contexts/cartContext";
import { cartReducer, initialState } from "reducers/cart/reducer";

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch
      }}
    >
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </CartContext.Provider>
  );
}
export default MyApp;
