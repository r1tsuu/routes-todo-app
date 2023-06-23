import { Box, Typography, Button } from "@mui/material";
import { PathMap } from "./PathMap";
import { LatLng } from "../types";

interface PathProps {
  title: string;
  description: string;
  distance: string;
  inFavorites: boolean;
  points: LatLng[];
  onFavoriteToggle?: React.MouseEventHandler<HTMLButtonElement>;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Path = ({
  title,
  description,
  distance,
  inFavorites,
  onFavoriteToggle,
  onDelete,
  points,
}: PathProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={0.3}
      >
        <Typography typography="h4">{title}</Typography>
        <Typography typography="h4" textAlign="center">
          {distance}
        </Typography>
      </Box>
      <Typography typography="body2">{description}</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {/* <Box height={400} bgcolor="primary.main" /> */}

        <PathMap
          points={points}
          mapContainerStyles={{
            width: "100%",
            height: "450px",
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems="flex-end"
        >
          <Button onClick={onFavoriteToggle} variant="outlined">
            {inFavorites ? "Remove from favorites" : "Add to favorites"}
          </Button>
          <Button onClick={onDelete} variant="outlined">
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
