import React, { useContext } from "react";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";
import apolloClient from "lib/apolloClient";
import { GET_PRODUCT, GET_ALL_PRODUCTS_SLUGS } from "api/queries";
import { Product as ProductInterface } from "interfaces/interfaces";
import CartContext from "contexts/cartContext";
import Types from "reducers/cart/types";
import classNames from "classnames";

interface ProductProps {
  product: ProductInterface;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { cart, dispatch } = useContext(CartContext);
  const { image, name, onSale, regularPrice, salePrice, price, description } =
    product;

  console.log("cart", cart);

  const addToCart = () => {
    dispatch({
      type: Types.addToCart,
      payload: { ...product }
    });
  };

  return (
    <div className="flex flex-row justify-between w-full max-w-2xl mx-auto">
      <div className="overflow-hidden relative w-2/5 h-80">
        {image && (
          <Image
            src={image.sourceUrl}
            layout="fill"
            quality={100}
            className="object-cover"
          />
        )}
      </div>
      <div className="w-3/5 pl-6">
        <h1 className="text-4xl text-left font-bold text-gray-900 sm:truncate mb-8">
          {name}
        </h1>
        <h2 className="mb-6">
          <span className="text-xl text-gray-900 mr-2">Price: </span>
          <span
            className={classNames("text-2xl mb-1", {
              "line-through text-gray-400 mr-3": onSale,
              "text-gray-900": !onSale
            })}
          >
            {regularPrice ?? price}
          </span>
          {onSale && (
            <span className="text-red-600 text-2xl ">NOW {salePrice}</span>
          )}
        </h2>
        <h3 className="text-xl text-gray-900 mr-2">Description:</h3>
        {description && (
          <div
            className="text-gray-600 text-sm mb-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <button
          onClick={addToCart}
          className="bg-black px-6 py-3 text-white text-xs uppercase hover:bg-white hover:text-black border-black border transition-colors duration-500"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: GET_PRODUCT,
    variables: { slug: params?.slug }
  });

  return {
    props: { product: data?.product, slug: params?.slug },
    revalidate: 100
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: GET_ALL_PRODUCTS_SLUGS
  });

  const paths = data?.products?.nodes?.map((product: { slug: string }) => ({
    params: { slug: product.slug }
  }));

  return {
    paths,
    fallback: true
  };
};

export default Product;
