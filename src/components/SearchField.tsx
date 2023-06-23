import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";

interface SearchFieldProps {
  value: string;
  onChange: (search: string) => void;
}

export const SearchField = ({ value, onChange }: SearchFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  return (
    <Box position="relative">
      <TextField
        fullWidth
        name="search-paths"
        label="Search..."
        size="medium"
        onChange={handleChange}
        value={value}
        id="paths-search"
      />
      <SearchIcon
        fontSize={"large"}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};
