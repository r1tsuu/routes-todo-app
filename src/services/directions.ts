import { LatLng } from "../types";

export const calculateDistanceBySteps = (
  legs: Array<{
    distance?: {
      value?: number;
    };
  }>
) => {
  return legs.reduce(
    (acc, curr) => (curr.distance ? (curr.distance.value ?? 0) + acc : acc),
    0
  );
};

export const createDirectionsRequest = (
  points: LatLng[],
  travelMode: google.maps.TravelMode = google.maps.TravelMode.WALKING
) => {
  if (points.length < 2)
    throw new Error(
      "directionsRequest needs at least 2 points, current=" + points.length
    );
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

export const createDirectionsCallback = (
  onSuccess: (result: google.maps.DirectionsResult, distance: number) => void
) => {
  return (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK)
      onSuccess(result, calculateDistanceBySteps(result.routes[0].legs));
  };
};

export const distanceToString = (distance: number) => {
  return distance >= 1000
    ? `${(distance / 1000).toFixed(2)} km`
    : `${distance} m`;
};
