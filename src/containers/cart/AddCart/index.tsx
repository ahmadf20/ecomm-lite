"use client";

import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useUsers } from "@/modules/user/hooks";
import { User } from "@/modules/user/models";
import { useSnackbar } from "@/components/Snackbar";
import { ProductListModal } from "./components/ProductListModal";
import { CartProduct } from "@/modules/cart/models";
import { useProducts } from "@/modules/product/hooks";
import { Product } from "@/modules/product/models";
import { RemoveCircle } from "@mui/icons-material";
import { useAddCart } from "@/modules/cart/hooks";
import { useRouter } from "next/navigation";

type ProductCart = {
  product: Product;
  quantity: number;
};

export const AddCartContainer = () => {
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const { data: users } = useUsers();
  const { data: products } = useProducts();

  const { mutate: addCart, isPending: isAddCartPending } = useAddCart({
    onSuccess: () => {
      showSnackbar("Cart added successfully");
      router.replace("/cart");
    },
  });

  const [selectedUser, setSelectedUser] = useState<User>();
  const [cartProducts, setCartProducts] = useState<ProductCart[]>([]);

  const handleSubmit = () => {
    if (!selectedUser) {
      showSnackbar("Please select a user");
      return;
    }

    if (!cartProducts?.length) {
      showSnackbar("Please select at least one product");
      return;
    }

    addCart({
      userId: selectedUser?.id,
      products: cartProducts?.map((product) => ({
        productId: product.product.id,
        quantity: product.quantity,
      })),
    });
  };

  const userOptions =
    users?.map((user) => `${user.name?.firstname} ${user.name?.lastname}`) ||
    [];

  const handleSelectProduct = (product: CartProduct) => {
    const isExists = cartProducts?.some(
      (p) => p.product.id === product.productId
    );

    if (isExists) {
      return setCartProducts((prev) =>
        prev.map((p) =>
          p.product.id === product.productId
            ? { ...p, quantity: p.quantity + (product.quantity || 1) }
            : p
        )
      );
    }

    setCartProducts((prev) => [
      ...prev,
      {
        product: products?.find((p) => p.id === product.productId) || {},
        quantity: product.quantity || 1,
      },
    ]);
  };

  const handleRemoveProduct = (product: ProductCart) => {
    setCartProducts((prev) =>
      prev.filter((p) => p.product.id !== product.product.id)
    );
  };

  return (
    <Container sx={{ my: 4, pb: 12 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Add New Cart
      </Typography>

      {/* Select User */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        User
      </Typography>
      <Autocomplete
        disablePortal
        options={userOptions}
        sx={{ width: 300, mb: 4 }}
        renderInput={(params) => <TextField {...params} />}
        onChange={(e, value) =>
          setSelectedUser(
            users?.find(
              (user) =>
                `${user.name?.firstname} ${user.name?.lastname}` === value
            )
          )
        }
      />

      {/* Select Products */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Products
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {cartProducts?.map((product) => (
          <ProductCard
            key={product?.product?.id}
            product={product?.product}
            suffix={
              <Box display="flex" gap={2} alignItems="center">
                <Typography variant="body1">
                  Qty: {product?.quantity}
                </Typography>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveProduct(product)}
                >
                  <RemoveCircle />
                </IconButton>
              </Box>
            }
          />
        ))}
        <ProductListModal onAddToCart={handleSelectProduct} />
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleSubmit}
        loading={isAddCartPending}
      >
        Submit
      </Button>
    </Container>
  );
};
