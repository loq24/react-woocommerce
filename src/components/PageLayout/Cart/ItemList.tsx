import { CartProduct } from "interfaces";
import Item from "./Item";

interface ItemListProps {
  products: CartProduct[];
}

const ItemList: React.FC<ItemListProps> = ({ products }) => {
  return (
    <div className="flex flex-col">
      {products.map((product) => (
        <Item key={product.slug} product={product} />
      ))}
    </div>
  );
};

export default ItemList;
