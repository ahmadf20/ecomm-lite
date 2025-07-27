"use client";

import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLogout } from "@/modules/auth/hooks";
import { useSnackbar } from "./Snackbar";
import Link from "next/link";
import { useIsAuth } from "@/modules/auth/hooks";
import { ShoppingBag } from "@mui/icons-material";

export const Navbar = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const { data: auth } = useIsAuth();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    if (isPending) return;
    logout(undefined, {
      onSuccess: () => {
        router.push("/login");
        showSnackbar("Logout successful");
      },
    });
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

            {auth?.isAuth ? (
              <Button
                color="inherit"
                onClick={handleLogout}
                disabled={isPending}
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};
