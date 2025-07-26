export type ProductsResponse = Product[] | undefined;
export type ProductResponse = Product | undefined;

export type Product = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: Rating;
};

export type Rating = {
  rate?: number;
  count?: number;
};
