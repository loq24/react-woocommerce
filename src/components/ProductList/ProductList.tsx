import { Product } from "interfaces/interfaces";
import ProductItem from "./ProductItem";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="grid gap-x-1 gap-y-14 grid-cols-4 ">
      {products.map((product) => (
        <ProductItem product={product} key={product.slug} />
      ))}
    </div>
  );
};

export default ProductList;
