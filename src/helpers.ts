import { geoToH3, polyfill } from 'h3-js';
import { ILatLng, Coordinates, H3Set } from './global';

function latLngArrayToH3Set(positionArr: ILatLng[], resolution: number): H3Set {
  return positionArr.map((point) => geoToH3(point.lat, point.lng, resolution));
}

function coordinatesArrayToH3Set(
  positionArr: Coordinates[],
  resolution: number
): H3Set {
  return positionArr.map((point) => geoToH3(point[0], point[1], resolution));
}

function getH3SetFromCoordinateBoundary(
  boundary: Coordinates[],
  resolution: number
) {
  return polyfill(boundary, resolution);
}

export {
  coordinatesArrayToH3Set,
  latLngArrayToH3Set,
  getH3SetFromCoordinateBoundary,
};
