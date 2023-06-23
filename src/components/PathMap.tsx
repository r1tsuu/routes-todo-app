import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { LatLng } from "../types";
import { mapStyles, GOOGLE_MAP_API_KEY } from "../app/googleMap";
import {
  calculateDistanceBySteps,
  createDirectionsRequest,
} from "../services/directions";

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

const defaultCenter = {
  lat: 50.4113731,
  lng: 30.5993112,
};

interface PathMapProps {
  points?: LatLng[];
  onChange?: (params: { points: LatLng[]; distance: number | null }) => void;
  editable?: boolean;
  mapContainerStyles?: React.CSSProperties;
}

export const PathMap = ({
  points: defaultPoints = [],
  onChange,
  editable,
  mapContainerStyles,
}: PathMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  const [directionsResult, setDirectionsResult] =
    useState<null | google.maps.DirectionsResult>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);

  const [clickedToAdd, setClickedToAdd] = useState(false);
  const [mapCenter, setMapCenter] = useState(() =>
    defaultPoints[0]
      ? {
          lat: defaultPoints[0].lat,
          lng: defaultPoints[0].lng,
        }
      : defaultCenter
  );

  const [map, setMap] = useState<null | google.maps.Map>(null);
  const [points, setPoints] = useState<LatLng[]>(defaultPoints);

  const updateCenter = (center?: google.maps.LatLngLiteral) => {
    if (center) return setMapCenter(center);
    const mapCenter = map?.getCenter()?.toJSON();
    if (mapCenter) setMapCenter(mapCenter);
  };

  const createDragHandler =
    (pointIndex: number) => (e: google.maps.MapMouseEvent) => {
      setPoints((prevPoints) =>
        prevPoints.map((point, index) =>
          pointIndex === index && e.latLng ? e.latLng.toJSON() : point
        )
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
    setPoints(defaultPoints);
  }, [defaultPoints]);

  useEffect(() => {
    if (window.google && isLoaded && points.length > 1) {
      if (directionsService.current === null)
        directionsService.current = new google.maps.DirectionsService();

      directionsService.current.route(
        createDirectionsRequest(points),
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result !== null) {
            setDirectionsResult(result);
            if (typeof onChange === "function")
              onChange({
                points,
                distance: calculateDistanceBySteps(result.routes[0].legs),
              });
          }
        }
      );
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
        mapContainerStyle={mapContainerStyles}
      >
        {points.map((point, index) => (
          <Marker
            position={point}
            label={(index + 1).toString()}
            {...(editable && {
              onDragEnd: createDragHandler(index),
              draggable: true,
            })}
          />
        ))}
        {directionsResult && (
          <DirectionsRenderer
            options={{
              directions: directionsResult,
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "white",
                strokeWeight: 2,
              },
            }}
          />
        )}
      </GoogleMap>
      {editable && (
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
      )}
    </Box>
  ) : (
    <span>"Loading"</span>
  );
};
