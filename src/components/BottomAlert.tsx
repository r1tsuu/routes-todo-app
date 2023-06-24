import { Snackbar, Alert, AlertColor } from "@mui/material";

interface BottomAlertProps {
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  severity?: AlertColor;
}

export const BottomAlert = ({
  title,
  isOpen,
  onClose,
  severity = "success",
}: BottomAlertProps) => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert severity={severity} onClose={onClose}>
        {title}
      </Alert>
    </Snackbar>
  );
};
