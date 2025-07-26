"use client";

import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLogout } from "@/modules/auth/hooks";
import { useSnackbar } from "./Snackbar";
import Link from "next/link";
import { Logout, ShoppingBag } from "@mui/icons-material";

export const Navbar = () => {
  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  const { mutate: logout, isPending } = useLogout({
    onSuccess: () => {
      router.push("/login");
      showSnackbar("Logout successful");
    },
  });

  const handleLogout = () => {
    if (isPending) return;
    logout();
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
              display="flex"
              gap={2}
            >
              <Link href="/">EComm Lite</Link>
            </Box>

            <Link href="/cart">
              <IconButton color="inherit" sx={{ ml: 2 }}>
                <ShoppingBag />
              </IconButton>
            </Link>

            {/* TODO: should only be visible when logged in */}
            <IconButton
              color="inherit"
              onClick={handleLogout}
              disabled={isPending}
              sx={{ ml: 2 }}
            >
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};
