import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome to EComm Lite
        </Typography>
      </Box>
    </main>
  );
}
