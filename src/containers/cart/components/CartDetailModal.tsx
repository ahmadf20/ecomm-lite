"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useUser } from "@/modules/user/hooks";
import { useCart } from "@/modules/cart/hooks";
import { useProductsByIds } from "@/modules/product/hooks";
import { Product } from "@/modules/product/models";
import Image from "next/image";
import { ProductDetailModal } from "@/components/ProductDetailModal";

type CartDetailProps = {
  cartId: number;
};

export const CartDetail = ({ cartId }: CartDetailProps) => {
  const [open, setOpen] = useState(false);

  const { data: cart, isLoading: isLoadingCart } = useCart(cartId, {
    enabled: Boolean(cartId) && open,
  });

  const { data: user, isLoading: isLoadingUser } = useUser(cart?.userId || 0, {
    enabled: Boolean(cart?.userId) && open,
  });

  const { data: products, isLoading: isLoadingProducts } = useProductsByIds(
    cart?.products?.map((product) => product.productId || 0) || [],
    {
      enabled: Boolean(cart?.products) && open,
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const isLoading = isLoadingCart || isLoadingUser || isLoadingProducts;

  const userData = [
    {
      label: "Name",
      value: user?.name?.firstname + " " + user?.name?.lastname,
    },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
    {
      label: "Address",
      value:
        user?.address?.street +
        " " +
        user?.address?.city +
        " " +
        user?.address?.zipcode,
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        loading={isLoading}
      >
        View
      </Button>

      <Dialog open={open && !isLoading} onClose={handleClose} maxWidth="xs">
        <DialogTitle fontWeight="bold">Cart Detail</DialogTitle>

        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 2 }}>
            User
          </Typography>

          <Grid container spacing={2}>
            {userData.map(({ label, value }) => (
              <React.Fragment key={label}>
                <Grid size={2}>{label}</Grid>
                <Grid size={10}>
                  <Typography variant="body1">{value || ""}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 2 }}>
            Products
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

function ProductCard({ product }: { product: Product }) {
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
      </Box>

      <ProductDetailModal
        productId={product.id || 0}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
