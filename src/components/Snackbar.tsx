import { Button, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState<string>("");

  const handleClose = () => {
    setMessage("");
  };

  const showSnackbar = (message: string) => {
    setMessage(message);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        open={message !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            Ok
          </Button>
        }
      />
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
