export type CartsResponse = Cart[] | undefined;
export type CartResponse = Cart | undefined;

export type AddCartRequest = Cart;

export type Cart = {
  id?: number;
  userId?: number;
  products?: CartProduct[];
  date?: string;
};

export type CartProduct = {
  productId?: number;
  quantity?: number;
};
