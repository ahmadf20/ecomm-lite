import { Navbar } from "@/components/Navbar";
import { Box } from "@mui/material";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main>
        <Box sx={{ mt: 12 }}>{children}</Box>
      </main>
    </div>
  );
}
