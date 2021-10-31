export interface CommonFields {
  image: {
    altText: string;
    sourceUrl: string;
    mediaDetails: {
      height: number;
      width: number;
    };
  };
  slug: string;
  name: string;
  description?: string;
}

export interface ProductCategory extends CommonFields {}
export interface Product extends CommonFields {
  onSale: boolean;
  price: string;
  regularPrice: string;
  salePrice: string;
}
