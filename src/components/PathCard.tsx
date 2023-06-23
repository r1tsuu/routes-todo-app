import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Typography } from "@mui/material";

interface PathCardProps {
  title: string;
  shortDescription: string;
  distance: string;
  inFavorites?: boolean;
  isActive: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const PathCard = ({
  title,
  shortDescription,
  distance,
  inFavorites,
  isActive,
  onClick,
}: PathCardProps) => {
  return (
    <Box
      bgcolor={isActive ? "primary.light" : "grey.200"}
      display="flex"
      alignItems="center"
      padding={1}
      color={isActive ? "grey.100" : "grey.800"}
      borderRadius={2}
      onClick={onClick}
      gap={0.5}
      sx={{ cursor: isActive ? "default" : "pointer" }}
    >
      <Box width="70%" display="flex" gap={1} alignItems="center">
        <ZoomOutMapIcon
          sx={{
            fontSize: 36,
          }}
        />
        <Box>
          <Box display="flex" gap={0.2} alignItems="center">
            {inFavorites && (
              <StarIcon
                sx={{
                  color: isActive ? "secondary.light" : "primary.light",
                }}
                color="inherit"
              />
            )}
            <Typography typography="h6">{title}</Typography>
          </Box>
          <Typography fontSize={14} typography="body2">
            {shortDescription}
          </Typography>
        </Box>
      </Box>
      <Box
        width="30%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography typography="h6">{distance}</Typography>
        <ArrowForwardIosIcon />
      </Box>
    </Box>
  );
};
