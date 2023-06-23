import { Box, Typography, Button } from "@mui/material";

interface PathProps {
  title: string;
  description: string;
  distance: string;
  isFavorited: boolean;
}

export const Path = ({
  title,
  description,
  distance,
  isFavorited,
}: PathProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography typography="h4">{title}</Typography>
        <Typography typography="subtitle1">{distance}</Typography>
      </Box>
      <Typography typography="body2">{description}</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box height={400} bgcolor="primary.main" />
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems="flex-end"
        >
          <Button>
            {isFavorited ? "Add to favorites" : "Remove from favorites"}
          </Button>
          <Button>Remove</Button>
        </Box>
      </Box>
    </Box>
  );
};
