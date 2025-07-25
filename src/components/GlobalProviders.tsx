"use client";

import { themes } from "@/config/themes";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./Snackbar";

const queryClient = new QueryClient();

export const GlobalProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <ThemeProvider theme={themes}>{children}</ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};
