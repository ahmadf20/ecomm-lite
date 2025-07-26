import { AddCartContainer } from "@/containers/cart/AddCart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Cart",
  description: "Add Cart Page",
};

export default function AddCart() {
  return <AddCartContainer />;
}
