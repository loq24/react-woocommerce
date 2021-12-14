import styles from "styles/components/PageLayout/Header.module.scss";
import Link from "next/link";
import { useContext } from "react";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import { CartProduct } from "interfaces";
import Cart from "./Cart/Cart";

const Header = () => {
  const { cart } = useContext(CartItemsContext);
  const { toggleCartVisibility } = useContext(CartVisibilityContext);
  const cartLength = cart.reduce(
    (count: number, item: CartProduct) =>
      (count += item.totalItems ? item.totalItems : 1),
    0
  );

  return (
    <>
      <Cart />
      <header className="bg-black sticky top-0 z-20">
        <div className="w-full mx-auto flex justify-between py-4 max-w-7xl px-6">
          <nav>
            <ul className={styles.mainNav}>
              <li>
                <Link href="/">
                  <a>Shop</a>
                </Link>
              </li>
              <li>
                <a href="https://github.com/loq24/react-ecommerce">Github</a>
              </li>
              <li>
                <a href="https://lougiequisel.com/">About the author</a>
              </li>
            </ul>
          </nav>
          <div>
            <button className="relative z-50 border-0 bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer hover:opacity-70 transition duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                onClick={toggleCartVisibility}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartLength > 0 && (
                <span className="absolute w-4 h-4 text-black text-xs border border-solid border-gray-500 rounded-full flex flex-row justify-center items-center p-2 -left-2 -bottom-2 bg-white">
                  {cartLength}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
