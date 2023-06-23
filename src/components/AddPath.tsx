import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { PathMap } from "./PathMap";

const Field = ({
  element,
  label,
}: {
  element: React.ReactNode;
  label: string;
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography typography="body1">{label}</Typography>
      {element}
    </Box>
  );
};

const markers = [
  {
    lat: 50.4113731,
    lng: 30.5993112,
  },
  {
    lat: 50.4213731,
    lng: 30.2993112,
  },
];

const center = {
  lat: 50.4113731,
  lng: 30.5993112,
};

export const AddPath = () => {
  // const { loadError, isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: GOOGLE_MAP_API_KEY,
  // });

  // const [map, setMap] = useState<null | google.maps.Map>(null);

  // const renderMap = () => {
  //   const onLoad = (map: google.maps.Map) => {
  //     setMap(map);
  //   };

  //   return (
  //     <GoogleMap
  //       mapContainerStyle={{
  //         height: "600px",
  //         width: "100%",
  //       }}
  //       zoom={10}
  //       center={center}
  //       onLoad={onLoad}
  //     >
  //       {markers.map((pos, index) => (
  //         <Marker key={index} position={pos} />
  //       ))}
  //     </GoogleMap>
  //   );
  // };

  // const onUnmount = useCallback(() => setMap(null), []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} display="flex" flexDirection="column" gap={6}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Field label="Title" element={<TextField />} />
          <Field
            label="Short description"
            element={<TextField minRows={3} />}
          />
          <Field
            label="Full description"
            element={<TextareaAutosize minRows={5} />}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap={6} alignItems="center">
          <Typography typography="h4">Length 1.13 km</Typography>
          <Button size="large" variant="contained">
            Add Path
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <PathMap />
      </Grid>
    </Grid>
  );
};
