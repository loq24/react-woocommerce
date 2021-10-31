import Link from "next/link";
import styles from "styles/components/PageLayout/Header.module.scss";

const Header = () => {
  return (
    <header className="bg-black sticky top-0 z-20">
      <div className="w-full mx-auto flex justify-between py-4 max-w-7xl">
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
        <div className="relative z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
