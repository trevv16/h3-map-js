import { Coordinates, ILatLng, IBounds, H3Set } from './global';

function parseCoordinate(point: Coordinates): ILatLng {
  return {
    lat: Number(point[0]),
    lng: Number(point[1]),
  };
}

function parseCoordinates(coordinates: Coordinates[]): ILatLng[] {
  return coordinates.map((point) => parseCoordinate(point));
}

function boundsToCoordinateBoundary(bounds: IBounds): Coordinates[] {
  return [
    [bounds.ne[0], bounds.ne[1]],
    [bounds.ne[0], bounds.sw[1]],
    [bounds.sw[0], bounds.sw[1]],
    [bounds.sw[0], bounds.ne[1]],
  ];
}

function deDupeH3Sets(
  primarySet: H3Set,
  secondarySet: H3Set
): [H3Set, H3Set, H3Set] {
  const totalSet = new Set([...primarySet, ...secondarySet]);
  const filteredSecondarySet = secondarySet.filter(
    (h3Index) => !primarySet.includes(h3Index)
  );

  return [primarySet, filteredSecondarySet, Array.from(totalSet)];
}

export {
  parseCoordinate,
  parseCoordinates,
  boundsToCoordinateBoundary,
  deDupeH3Sets,
};
