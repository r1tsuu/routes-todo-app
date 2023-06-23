import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, TextField } from "@mui/material";

interface ComboboxProps<T> {
  id?: string;
  options: Array<T>;
}

export const Combobox = <T,>(props: ComboboxProps<T>) => {
  return (
    <Autocomplete
      popupIcon={<SearchIcon sx={{ fontSize: 38 }} />}
      sx={{
        ".MuiAutocomplete-endAdornment": {
          top: "50%",
          transform: "translateY(-50%)",
          ".MuiButtonBase-root": {
            transform: "none !important",
          },
        },
      }}
      disablePortal
      renderInput={(params) => (
        <TextField {...params} label="Search..." size="medium" />
      )}
      {...props}
    />
  );
};
