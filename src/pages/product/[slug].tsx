import React, { useContext } from "react";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";
import apolloClient from "lib/apolloClient";
import { GET_PRODUCT, GET_ALL_PRODUCTS_SLUGS } from "api/queries";
import { Product as ProductInterface } from "interfaces";
import CartItemsContext from "contexts/cartItemsContext";
import CartVisibilityContext from "contexts/cartVisibilityContext";
import Types from "reducers/cart/types";
import classNames from "classnames";
import MetaHead from "components/MetaHead";

interface ProductProps {
  product: ProductInterface;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { dispatch } = useContext(CartItemsContext);
  const { toggleCartVisibility } = useContext(CartVisibilityContext);

  const addToCart = () => {
    dispatch({
      type: Types.addToCart,
      payload: { ...product }
    });
    toggleCartVisibility();
  };

  return (
    <>
      {product.name && (
        <MetaHead
          title={`React WooCommerce | ${product.name}`}
          description={
            product.description
              ? product.description.replace(/<\/?[^>]+(>|$)/g, "")
              : "React WooCommerce"
          }
        />
      )}
      <div className="flex sm:flex-row flex-col justify-between w-full max-w-2xl mx-auto">
        <div className="overflow-hidden relative sm:w-2/5 w-full sm:mb-0 mb-5 h-80">
          {product?.image && (
            <Image
              src={product?.image?.sourceUrl}
              layout="fill"
              quality={100}
              className="object-cover"
            />
          )}
        </div>
        <div className="sm:w-3/5 w-full sm:pl-6 sm:pr-0 pl-5 pr-5 ">
          <h1 className="text-4xl text-left font-bold text-gray-900 sm:truncate mb-8">
            {product?.name}
          </h1>
          <h2 className="mb-6">
            <span className="text-xl text-gray-900 mr-2">Price: </span>
            <span
              className={classNames("text-2xl mb-1", {
                "line-through text-gray-400 mr-3": product?.onSale,
                "text-gray-900": !product?.onSale
              })}
            >
              {product?.regularPrice ?? product?.price}
            </span>
            {product?.onSale && (
              <span className="text-red-600 text-2xl ">
                NOW {product?.salePrice}
              </span>
            )}
          </h2>
          <h3 className="text-xl text-gray-900 mr-2">Description:</h3>
          {product?.description && (
            <div
              className="text-gray-600 text-sm mb-5"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          )}

          <button
            onClick={addToCart}
            className="bg-black px-6 py-3 text-white text-xs uppercase hover:bg-white hover:text-black border-black border-2 transition-colors duration-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
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
