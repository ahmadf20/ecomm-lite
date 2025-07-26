"use client";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useProducts } from "@/modules/product/hooks";
import { Typography } from "@mui/material";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/modules/product/models";
import { CartProduct } from "@/modules/cart/models";

export const ProductListModal = ({
  onAddToCart,
}: {
  onAddToCart: (products: CartProduct) => void;
}) => {
  const [open, setOpen] = useState(false);

  const { data: products, isLoading } = useProducts();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    onAddToCart({ productId: product.id, quantity });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Add Product</Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle fontWeight="bold">Product List</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {isLoading && <Typography variant="body1">Loading...</Typography>}
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
