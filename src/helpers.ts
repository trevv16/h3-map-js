import { geoToH3 } from 'h3-js';
import { ILatLng, Coordinates, H3Set } from './global';

/** Converts array of LatLng into an array of H3 indexes (H3Set)
 *
 * @param {ILatLng[]} positionArr array of lat/long points to convert
 * @param {number} resolution the resolution of the map to calculate index values
 * @returns {H3Set} array of unique h3 indexes the positionArray points were contained in
 */
function latLngArrayToH3Set(positionArr: ILatLng[], resolution: number): H3Set {
  // iterate through each lat/long point and calculate the h3 index
  return positionArr.map((point) => geoToH3(point.lat, point.lng, resolution));
}

/** Converts array of coordinates into an array of H3 indexes (H3Set)
 *
 * @param {Coordinates[]} positionArr array of lat/long points to convert
 * @param {number} resolution the resolution of the map to calculate index values
 * @returns {H3Set} array of unique h3 indexes the positionArray points were contained in
 */
function coordinatesArrayToH3Set(
  positionArr: Coordinates[],
  resolution: number
): H3Set {
  // iterate through each lat/long point and calculate the h3 index
  return positionArr.map((point) => geoToH3(point[0], point[1], resolution));
}

export { coordinatesArrayToH3Set, latLngArrayToH3Set };
