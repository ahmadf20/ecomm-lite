import { useState } from "react";
import { Product } from "@/modules/product/models";
import { ProductDetailModal } from "./ProductDetailModal";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  suffix?: React.ReactNode;
};

export const ProductCard = ({
  product,
  onAddToCart,
  suffix,
}: ProductCardProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <Image
          src={product.image || ""}
          alt={product.title || ""}
          width={75}
          height={75}
          style={{ objectFit: "contain" }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body1" fontWeight="bold">
            {product.price}
          </Typography>
        </Box>

        {suffix}
      </Box>

      <ProductDetailModal
        productId={product.id || 0}
        open={open}
        onClose={handleClose}
        onAddToCart={onAddToCart}
      />
    </>
  );
};
