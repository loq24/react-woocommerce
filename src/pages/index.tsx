import { GetStaticProps } from "next";
import apolloClient from "lib/apolloClient";
import { ProductCategory, Product } from "interfaces";
import { GET_PRODUCT_CATEGORIES, GET_ON_SALE_PRODUCTS } from "api/queries";
import CategoryList from "components/CategoryList/CategoryList";
import ProductList from "components/ProductList/ProductList";
import MetaHead from "components/MetaHead";

interface HomeProps {
  categories: ProductCategory[];
  onSaleProducts: Product[];
}

const Home: React.FC<HomeProps> = ({ categories, onSaleProducts }) => {
  return (
    <>
      <MetaHead
        title="React WooCommerce"
        description="An eCommerce template using TailWindCSS and NextJS' Incremental Static Regeneration. Also, powered by WooGraphQL and WP Headless CMS in the backend."
      />
      <h1 className="main-heading text-center">
        Here to make your life easier.
      </h1>
      {categories && <CategoryList categories={categories} />}

      <h2 className="main-heading text-center">On Sale!</h2>
      {onSaleProducts && <ProductList products={onSaleProducts} />}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: productCategoriesData } = await apolloClient.query({
    query: GET_PRODUCT_CATEGORIES
  });
  const { data: onSaleProductsData, error } = await apolloClient.query({
    query: GET_ON_SALE_PRODUCTS
  });

  return {
    props: {
      categories: productCategoriesData?.productCategories?.nodes,
      onSaleProducts: onSaleProductsData?.products?.nodes
    },
    revalidate: 100
  };
};

export default Home;
