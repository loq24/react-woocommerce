import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORIES = gql`
  query GetProductCategories {
    productCategories(where: { hideEmpty: true, hierarchical: true }) {
      nodes {
        image {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        slug
        name
        description
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORIES_SLUGS = gql`
  query GetProductCategoriesSlugs {
    productCategories(where: { hideEmpty: true, hierarchical: true }) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_ON_SALE_PRODUCTS = gql`
  query GetOnSaleProducts {
    products(where: { onSale: true, typeNotIn: GROUPED }, first: 4) {
      nodes {
        name
        slug
        onSale
        image {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        ... on SimpleProduct {
          price
          salePrice
          regularPrice
        }
        ... on VariableProduct {
          price
          salePrice
          regularPrice
        }
        ... on ExternalProduct {
          price
          salePrice
          regularPrice
        }
      }
    }
  }
`;

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($category: String!) {
    products(where: { category: $category, typeNotIn: GROUPED }) {
      nodes {
        name
        slug
        onSale
        image {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
        ... on SimpleProduct {
          price
          salePrice
          regularPrice
        }
        ... on VariableProduct {
          price
          salePrice
          regularPrice
        }
        ... on ExternalProduct {
          price
          salePrice
          regularPrice
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      name
      slug
      onSale
      description
      image {
        altText
        sourceUrl
        mediaDetails {
          height
          width
        }
      }
      ... on SimpleProduct {
        price
        salePrice
        regularPrice
      }
      ... on VariableProduct {
        price
        salePrice
        regularPrice
      }
      ... on ExternalProduct {
        price
        salePrice
        regularPrice
      }
    }
  }
`;

export const GET_ALL_PRODUCTS_SLUGS = gql`
  query GetAllProductsSlugs {
    products(where: { typeNotIn: GROUPED }, first: 100) {
      nodes {
        slug
      }
    }
  }
`;
