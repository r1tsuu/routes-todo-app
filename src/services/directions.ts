import { LatLng } from "../types";

export const calculateDistance = (result: google.maps.DirectionsResult) => {
  return result?.routes[0].legs.reduce(
    (acc, curr) => (curr.distance ? curr.distance.value + acc : acc),
    0
  );
};

export const directionsRequest = (
  points: LatLng[],
  travelMode = google.maps.TravelMode.DRIVING
) => {
  return {
    origin: points[0],
    destination: points[points.length - 1],
    travelMode,
    ...(points.length > 2 && {
      waypoints: points.slice(1, -1).map((point) => ({
        location: point,
      })),
    }),
  };
};

export const directionsCallback = (
  onSuccess: (result: google.maps.DirectionsResult, distance: number) => void
) => {
  return (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK)
      onSuccess(result, calculateDistance(result));
  };
};
export const distanceToString = (distance: number) => {
  return distance >= 1000 ? `${distance / 1000} km` : `${distance} m`;
};
