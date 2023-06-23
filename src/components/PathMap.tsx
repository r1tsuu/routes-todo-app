import { DirectionsRenderer, DirectionsService, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { LatLng } from "../types";
import { mapStyles } from "../constants/mapStyles";
import { calculateDistanceBySteps, directionsRequest } from "../services/directions";

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

const m1 = markers[0];
const m2 = markers[1];

const w1 = {
  lat: 50.0413731,
  lng: 30.3993112,
};

const defaultCenter = {
  lat: 50.4113731,
  lng: 30.5993112,
};

interface PathMapProps {
  points?: LatLng[];
  onChange?: (params: { points: LatLng[]; distance: number | null }) => void;
}

export const PathMap = ({ points: defaultPoints = [], onChange }: PathMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  const [directionsResult, setDirectionsResult] = useState<null | google.maps.DirectionsResult>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);

  const [clickedToAdd, setClickedToAdd] = useState(false);
  const [mapCenter, setMapCenter] = useState(() =>
    defaultPoints[0]
      ? {
          lat: points[0].lat,
          lng: points[0].lng,
        }
      : defaultCenter
  );

  const [map, setMap] = useState<null | google.maps.Map>(null);
  const [points, setPoints] = useState<LatLng[]>(defaultPoints);

  const updateCenter = () => {
    const mapCenter = map?.getCenter()?.toJSON();
    if (mapCenter) setMapCenter(mapCenter);
  };

  console.log(mapCenter);

  const createDragHandler = (pointIndex: number) => (e: google.maps.MapMouseEvent) => {
    setPoints((prevPoints) =>
      prevPoints.map((point, index) => (pointIndex === index && e.latLng ? e.latLng.toJSON() : point))
    );
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (clickedToAdd) {
      setPoints((prev) => (e.latLng ? [...prev, e.latLng.toJSON()] : prev));
      setClickedToAdd(false);
      updateCenter();
    }
  };

  const handleAddButtonClick = () => {
    setClickedToAdd(true);
    updateCenter();
  };

  useEffect(() => {
    if (window.google && isLoaded && points.length > 1) {
      if (directionsService.current === null) directionsService.current = new google.maps.DirectionsService();

      directionsService.current.route(directionsRequest(points), (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result !== null) {
          setDirectionsResult(result);
          if (typeof onChange === "function")
            onChange({
              points,
              distance: calculateDistanceBySteps(result.routes[0].legs),
            });
        }
      });
    }
  }, [isLoaded, points]);

  if (loadError) return <span>"Load error"</span>;

  return isLoaded ? (
    <Box position="relative">
      <GoogleMap
        center={mapCenter}
        zoom={10}
        onLoad={setMap}
        onClick={handleMapClick}
        options={{
          styles: mapStyles,
        }}
        mapContainerStyle={{
          height: "600px",
          width: "100%",
        }}
      >
        {points.map((point, index) => (
          <Marker position={point} draggable onDragEnd={createDragHandler(index)} />
        ))}
        {directionsResult && (
          <DirectionsRenderer
            options={{
              directions: directionsResult,
              suppressMarkers: true,
            }}
          />
        )}
      </GoogleMap>
      <Button
        variant="contained"
        fullWidth
        startIcon={<AddLocationIcon />}
        onClick={handleAddButtonClick}
        sx={{
          position: "absolute",
          top: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: 300,
        }}
      >
        {clickedToAdd ? "Click on the map" : "Add marker"}
      </Button>
    </Box>
  ) : (
    <span>"Loading"</span>
  );
};
