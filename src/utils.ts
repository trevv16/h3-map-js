import { Coordinates, ILatLng, IBounds, H3Set } from './global';

/** Formats lat long coordinates array as LatLng object
 *
 * @param {Coordinates} point lat long coordinate array
 * @returns {LatLng} point object
 */
function parseCoordinate(point: Coordinates): ILatLng {
  return {
    lat: Number(point[0]),
    lng: Number(point[1]),
  };
}

/** Converts google map bounds object into an array of coordinates
 *
 * @param {IBounds} bounds object of bounds coordinates formatted as {ne, sw}
 * @returns {Coordinates[]} array of coordintates representing a bounding box
 */
function boundsToCoordinateBoundary(bounds: IBounds): Coordinates[] {
  return [
    [bounds.ne[0], bounds.ne[1]],
    [bounds.ne[0], bounds.sw[1]],
    [bounds.sw[0], bounds.sw[1]],
    [bounds.sw[0], bounds.ne[1]],
  ];
}

/** Takes two sets and dedupes them in respective priority
 *
 * @param  {H3Set} primarySet set of unique strings that are deemed higher priory
 * @param  {H3Set} secondarySet set of unique strings that are deemed lower priory
 * @returns {[H3Set, H3Set, H3Set]} an array of sets in specific order primarySet, filteredSecondarySet, totalSet
 */
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

export { parseCoordinate, boundsToCoordinateBoundary, deDupeH3Sets };
