"use client";

import { themes } from "@/config/themes";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./Snackbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minute
    },
  },
});

export const GlobalProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <ThemeProvider theme={themes}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
