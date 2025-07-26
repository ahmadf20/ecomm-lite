"use client";

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { useCarts } from "@/modules/cart/hooks";
import { useState } from "react";
import { CartDetail } from "./components/CartDetailModal";

const PER_PAGE = 5;

export const CartContainer = () => {
  const { data, isLoading } = useCarts();

  // Ideally this should be handled in the server
  const [page, setPage] = useState(0);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Carts
      </Typography>

      <TablePagination
        rowsPerPageOptions={[PER_PAGE]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={PER_PAGE}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>Total Product</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="body1">Loading...</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          <TableBody>
            {data?.slice(page * PER_PAGE, (page + 1) * PER_PAGE).map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>{cart.userId}</TableCell>
                <TableCell>{cart.products?.length}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(cart.date || ""))}
                </TableCell>
                <TableCell>
                  <CartDetail cartId={cart.id || 0} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
