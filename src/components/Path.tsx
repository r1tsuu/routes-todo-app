import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("md"));

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        gap={1}
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
        }}
      >
        <Typography
          typography="h4"
          sx={{
            textAlign: {
              xs: "center",
              md: "start",
            },
          }}
        >
          {title}
        </Typography>
        <Typography typography="h4" textAlign="center">
          {distance}
        </Typography>
      </Box>
      <Typography
        typography="body2"
        sx={{
          textAlign: {
            xs: "center",
            md: "start",
          },
        }}
      >
        {description}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
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
          alignItems="flex-end"
          sx={{
            gap: {
              xs: 2,
              md: 1,
            },
          }}
        >
          <Button
            onClick={onFavoriteToggle}
            variant="outlined"
            fullWidth={isMobile}
          >
            {inFavorites ? "Remove from favorites" : "Add to favorites"}
          </Button>
          <Button onClick={onDelete} variant="outlined" fullWidth={isMobile}>
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
