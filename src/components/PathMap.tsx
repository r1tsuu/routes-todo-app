import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../constants";
import { useRef, useState } from "react";

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

const center = {
  lat: 50.4113731,
  lng: 30.5993112,
};

interface PathMapProps {
  points: google.maps.LatLng[];
  onChange: (params: {
    markers: google.maps.LatLng[];
    distance: number;
  }) => void;
}

export const PathMap = ({ points }: PathMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
  });
  const [directionsResult, setDirectionsResult] =
    useState<null | google.maps.DirectionsResult>(null);
  const directionLoading = useRef<boolean>(false);

  // const [points, setPoints] = useState<google.maps.LatLng[]>([]);

  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    // return console.log(result);
    if (result !== null && status === "OK") setDirectionsResult(result);
    else console.log("DirectionsResult Error ", result);
  };

  const onLoad = (map: google.maps.Map) => {
    const directionsService = new google.maps.DirectionsService();
    directionLoading.current = true;
    directionsService.route(
      {
        origin: m1,
        destination: m2,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          {
            location: w1,
          },
        ],
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK)
          setDirectionsResult(result);
      }
    );
  };

  console.log(directionsResult);

  if (loadError) return <span>"Load error"</span>;

  return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={10}
      onLoad={onLoad}
      mapContainerStyle={{
        height: "600px",
        width: "100%",
      }}
    >
      <Marker position={m1} title="1" draggable>
        1
      </Marker>
      <Marker position={m2} title="2" draggable />
      {directionsResult && (
        <DirectionsRenderer
          options={{
            directions: directionsResult,
            suppressMarkers: true,
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <span>"Loading"</span>
  );
};
