import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Grid, Box, Typography } from "@mui/material";

interface PathCardProps {
  title: string;
  shortDescription: string;
  distance: string;
  isFavorited: boolean;
  isActive: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const PathCard = ({
  title,
  shortDescription,
  distance,
  isFavorited,
  isActive,
  onClick,
}: PathCardProps) => {
  return (
    <Grid
      bgcolor={isActive ? "primary.light" : "grey.200"}
      container
      display="flex"
      alignItems="center"
      padding={1}
      color={isActive ? "grey.100" : "grey.800"}
      borderRadius={2}
      onClick={onClick}
      sx={{ cursor: isActive ? "default" : "pointer" }}
    >
      <Grid item xs={10} display="flex" gap={1} alignItems="center">
        <ZoomOutMapIcon
          sx={{
            fontSize: 36,
          }}
        />
        <Box>
          <Box display="flex" gap={0.2} alignItems="center">
            {isFavorited && (
              <StarIcon
                sx={{
                  color: isActive ? "secondary.light" : "primary.light",
                }}
                color="inherit"
              />
            )}
            <Typography typography="subtitle2">{title}</Typography>
          </Box>
          <Typography fontSize={14} typography="body2">
            {shortDescription}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2} display="flex" justifyContent="space-between">
        <Typography typography="subtitle1">{distance}</Typography>
        <ArrowForwardIosIcon />
      </Grid>
    </Grid>
  );
};
