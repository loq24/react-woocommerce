import { Product } from "interfaces/interfaces";
import Image from "next/image";

interface ItemProps {
  product: Product;
}

const Item: React.FC<ItemProps> = ({ product }) => {
  const { image, name, price } = product;
  return (
    <div className="mb-7">
      <div className="flex flex-row mb-3 justify-between">
        <div className="w-4/5 flex flex-row">
          <Image
            src={image.sourceUrl}
            width={64}
            height={64}
            className="clickable-img"
          />
          <span className="text-lg ml-4 text-white">{name}</span>
        </div>
        <div className="w-1/5">
          <span className="text-lg text-gray-300">{price}</span>
        </div>
      </div>
      <div className="flex flex-row">
        <button className="border border-gray-500 p-1 border-solid">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <input
          type="text"
          className="border border-gray-500 p-1 border-solid bg-transparent ml-2 outline-none text-white"
        />
        <button className="border border-gray-500 p-1 border-solid text-white font-light text-lg">
          -
        </button>
        <button className="border border-gray-500 p-1 border-solid text-white font-light text-lg">
          +
        </button>
      </div>
    </div>
  );
};

export default Item;
