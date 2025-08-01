"use client";

import { useProduct } from "@/modules/product/hooks";
import { Product } from "@/modules/product/models";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

type ProductDetailModalProps = {
  productId: number;
  open: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
};

export const ProductDetailModal = ({
  productId,
  open,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) => {
  const { data: product, isLoading: isLoadingProduct } = useProduct(productId, {
    enabled: Boolean(productId) && open,
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle fontWeight="bold">Product Detail</DialogTitle>
      <DialogContent sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        {isLoadingProduct ? (
          <p>Loading...</p>
        ) : (
          <>
            <Image
              src={product?.image || ""}
              alt={product?.title || ""}
              width={150}
              height={150}
              style={{ objectFit: "contain" }}
            />

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                {product?.title}
              </Typography>
              <Typography variant="body1">{product?.description}</Typography>
              <br />
              <Typography variant="body1">Price: {product?.price}</Typography>

              <Typography variant="body1">
                Rating: {product?.rating?.rate} / 5 ({product?.rating?.count})
              </Typography>
              <Typography variant="body1">
                Category: {product?.category}
              </Typography>
            </Box>

            {onAddToCart && product && (
              <ProductQuantity
                onAddToCart={(quantity) => onAddToCart(product, quantity)}
              />
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

function ProductQuantity({
  onAddToCart,
}: {
  onAddToCart: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <TextField
        type="number"
        size="small"
        value={quantity}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value > 0) setQuantity(value);
        }}
        sx={{ width: 75 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAddToCart(quantity)}
      >
        Add
      </Button>
    </Box>
  );
}
