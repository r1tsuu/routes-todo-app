import {
  calculateDistanceBySteps,
  createDirectionsRequest,
  distanceToString,
} from "./directions";

const setupGoogleMock = () => {
  global.window.google = {
    maps: {
      TravelMode: {
        DRIVING: "DRIVING",
        BICYCLING: "BICYCLING",
        WALKING: "WALKING",
        TRANSIT: "TRANSIT",
      },
    },
  } as any;
};

const getRandomInRange = (from: number, to: number, fixed: number) => {
  return Math.random() * (to - from) + from;
};

const getRandomLatLng = () => {
  return {
    lat: getRandomInRange(-100, 100, 3),
    lng: getRandomInRange(-100, 100, 3),
  };
};

beforeAll(() => {
  setupGoogleMock();
});

test("calculateDistanceBySteps", () => {
  // Empty
  expect(calculateDistanceBySteps([])).toBe(0);

  // Normal
  expect(
    calculateDistanceBySteps([
      {
        distance: {
          value: 300,
        },
      },
      {
        distance: {
          value: 500,
        },
      },
      {
        distance: {
          value: 900,
        },
      },
    ])
  ).toBe(1700);

  // With undefined distance or value
  expect(
    calculateDistanceBySteps([
      {},
      {
        distance: {
          value: 300,
        },
      },
      {
        distance: {},
      },
      {
        distance: {
          value: 500,
        },
      },
    ])
  ).toBe(800);
});

test("createDirectionsRequest", () => {
  // Points length errors
  expect(() => createDirectionsRequest([])).toThrow(
    "directionsRequest needs at least 2 points, current=0"
  );
  expect(() =>
    createDirectionsRequest([
      {
        lat: 40,
        lng: 10,
      },
    ])
  ).toThrow("directionsRequest needs at least 2 points, current=1");

  const origin = getRandomLatLng();
  const destination = getRandomLatLng();

  // 2 Points origin and destination
  expect(createDirectionsRequest([origin, destination])).toMatchObject({
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  const pointThrough_1 = getRandomLatLng();

  // 3 Points and more (points through first element - origin and last element - destination)
  expect(
    createDirectionsRequest([origin, pointThrough_1, destination])
  ).toMatchObject({
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
    waypoints: [
      {
        location: pointThrough_1,
      },
    ],
  });

  const pointThrough_2 = getRandomLatLng();

  expect(
    createDirectionsRequest([
      origin,
      pointThrough_1,
      pointThrough_2,
      destination,
    ])
  ).toMatchObject({
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
    waypoints: [
      {
        location: pointThrough_1,
      },
      {
        location: pointThrough_2,
      },
    ],
  });

  // Travel mode
  expect(
    createDirectionsRequest(
      [origin, destination],
      google.maps.TravelMode.BICYCLING
    )
  ).toMatchObject({
    origin,
    destination,
    travelMode: google.maps.TravelMode.BICYCLING,
  });
});

test("distanceToString", () => {
  let distance = 999;
  expect(distanceToString(distance)).toBe("999 m");
  distance = 1000;
  expect(distanceToString(distance)).toBe("1 km");
  distance = 1500;
  expect(distanceToString(distance)).toBe("1.5 km");
});
