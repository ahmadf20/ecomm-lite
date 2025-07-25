"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLogout } from "@/modules/auth/hooks";
import { useSnackbar } from "./Snackbar";
import Link from "next/link";

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
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
              display="flex"
              gap={2}
            >
              <Typography variant="h6" component="div">
                EComm Lite
              </Typography>

              <Button color="inherit">
                <Link href="/cart">Cart</Link>
              </Button>
            </Box>

            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              disabled={isPending}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};
