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
  Fab,
} from "@mui/material";
import { useCarts } from "@/modules/cart/hooks";
import { useState } from "react";
import { CartDetail } from "./components/CartDetailModal";
import { DatePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { useRouter } from "next/navigation";
import { Add } from "@mui/icons-material";

const PER_PAGE = 5;

export const CartContainer = () => {
  const router = useRouter();

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
    <Container sx={{ my: 4, pb: 12 }}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => router.push("/cart/add")}
        sx={{ mb: 2, position: "fixed", right: 24, bottom: 24 }}
      >
        <Add />
      </Fab>

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Carts
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
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
            {/* Ideally sort & filter should be done from the BE */}
            {filteredData
              ?.slice(page * PER_PAGE, (page + 1) * PER_PAGE)
              ?.sort(
                (a, b) =>
                  new Date(b.date || "").getTime() -
                  new Date(a.date || "").getTime()
              )
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

      <TablePagination
        rowsPerPageOptions={[PER_PAGE]}
        component="div"
        count={filteredData?.length || 0}
        rowsPerPage={PER_PAGE}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
      />
    </Container>
  );
};
