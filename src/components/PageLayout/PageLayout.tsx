import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart/Cart";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div>
      <Cart />
      <Header />
      <div className="container max-w-screen-lg mx-auto px-4 py-10 z-10 relative">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
