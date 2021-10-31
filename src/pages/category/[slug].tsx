import { GetStaticProps, GetStaticPaths } from "next";
import apolloClient from "lib/apolloClient";
import {
  GET_CATEGORY_PRODUCTS,
  GET_PRODUCT_CATEGORIES_SLUGS
} from "api/queries";
import { Product } from "interfaces/interfaces";
import ProductList from "components/ProductList/ProductList";

interface CategoryProps {
  products: Product[];
  slug: string;
}

const Category: React.FC<CategoryProps> = ({ products, slug }) => {
  console.log("products", products);

  return (
    <div>
      <h1 className="main-heading capitalize">{slug}</h1>
      {products && <ProductList products={products} />}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: GET_CATEGORY_PRODUCTS,
    variables: { category: params?.slug }
  });

  return {
    props: { products: data?.products?.nodes, slug: params?.slug },
    revalidate: 100
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apolloClient.query({
    query: GET_PRODUCT_CATEGORIES_SLUGS
  });

  const paths = data?.productCategories?.nodes?.map(
    (category: { slug: string }) => ({
      params: { slug: category.slug }
    })
  );

  return {
    paths,
    fallback: true
  };
};

export default Category;
