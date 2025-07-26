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
  Box,
  Button,
} from "@mui/material";
import { useCarts } from "@/modules/cart/hooks";
import { useState } from "react";
import { CartDetail } from "./components/CartDetailModal";
import { DatePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";

const PER_PAGE = 5;

export const CartContainer = () => {
  const { data, isLoading } = useCarts();

  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState<PickerValue | null>(null);
  const [endDate, setEndDate] = useState<PickerValue | null>(null);

  const filteredData = data?.filter((cart) => {
    if (!startDate || !endDate) return true;

    const cartDate = new Date(cart.date || "");
    return cartDate >= startDate.toDate() && cartDate <= endDate.toDate();
  });

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Carts
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          format="DD-MM-YYYY"
          sx={{ width: "175px" }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          format="DD-MM-YYYY"
          sx={{ width: "175px" }}
        />
        <Button onClick={handleClearFilter}>Clear</Button>
      </Box>

      <TablePagination
        rowsPerPageOptions={[PER_PAGE]}
        component="div"
        count={filteredData?.length || 0}
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
            {filteredData
              ?.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
              .map((cart) => (
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
