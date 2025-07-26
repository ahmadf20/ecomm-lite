import { CartContainer } from "@/containers/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart Page",
};

export default function Carts() {
  return <CartContainer />;
}
