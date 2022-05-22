import { geoToH3, polyfill } from 'h3-js';
import { ILatLng, IBounds, H3Set, Coordinates, H3SetGroup } from './global';
import { boundsToCoordinateBoundary } from './utils';

interface Ih3Map {
  resolution: number;
  userPosition?: ILatLng | null;
  bounds?: IBounds | null;
  focus?: ILatLng[] | null;
  getUserH3Set(): H3Set;
  getBackgroundH3Set(arg0: IBounds): H3Set;
  getFocusH3Set(arg0: Coordinates[] | null): H3Set;
  getDistinctSetGroup(): H3SetGroup;
}

class H3Map implements Ih3Map {
  resolution: number;

  userPosition: ILatLng | null;

  bounds: IBounds | null;

  focus: ILatLng[] | null;

  constructor(
    _resolution: number,
    _userPosition: ILatLng | null,
    _bounds: IBounds | null,
    _focus: ILatLng[] | null
  ) {
    if (!_resolution) throw new Error('Resolution is not defined');
    this.resolution = _resolution;

    // set optional values
    this.userPosition = _userPosition;
    this.bounds = _bounds;
    this.focus = _focus;
  }

  // return h3 index of user position formatted as array
  getUserH3Set() {
    if (!this.userPosition) throw new Error('User position is not defined');
    if (
      Number.isNaN(this.userPosition.lat) ||
      Number.isNaN(!this.userPosition.lng)
    ) {
      throw new Error('User position is not valid');
    }

    return [
      geoToH3(this.userPosition.lat, this.userPosition.lng, this.resolution),
    ];
  }

  // return h3 index set from an array of coordinates
  getFocusH3Set(focusCoordinates: Coordinates[] | null = null) {
    if (!focusCoordinates && !this.focus) {
      throw new Error('Must specify focus coordinates');
    }
    let focusH3Set = null;

    if (focusCoordinates) {
      focusH3Set = focusCoordinates.map((point) =>
        geoToH3(point[0], point[1], this.resolution)
      );
    } else if (this.focus) {
      focusH3Set = this.focus.map((point) =>
        geoToH3(point.lat, point.lng, this.resolution)
      );
    } else {
      throw new Error('Failed to record focus coordinates');
    }

    return focusH3Set;
  }

  // return h3 index set that fit within geo boundary
  getBackgroundH3Set(currentBounds: IBounds | null = null) {
    if (!currentBounds && !this.bounds) {
      throw new Error('Must specify bounds');
    }

    // convert google formatted {ne, sw} boundary points into coordinates array
    let pointBoundary = null;
    if (currentBounds) {
      pointBoundary = boundsToCoordinateBoundary(currentBounds);
    } else if (this.bounds) {
      pointBoundary = boundsToCoordinateBoundary(this.bounds);
    } else {
      throw new Error('Failed to record bounds');
    }

    return polyfill(pointBoundary, this.resolution);
  }

  // returns a set of h3 indexs grouped by type
  getDistinctSetGroup() {
    const groupSet = new Set();
    const group: H3SetGroup = {
      background: [],
      focus: [],
      user: [],
    };

    if (this.userPosition) {
      // get user h3 index set
      const userSet = this.getUserH3Set();
      // assign value to return object
      group.user = userSet;
      // add value to total set
      groupSet.add(userSet[0]);
    }

    if (this.focus) {
      // get focus h3 index set
      const focusSet = this.getFocusH3Set();
      // extract unique values from focus set not in total set
      const uniqueValuesFromFocus = focusSet.filter(
        (h3Index) => !groupSet.has(h3Index)
      );
      // assign unique values to return object
      group.focus = uniqueValuesFromFocus;
      // add value to total set
      uniqueValuesFromFocus.forEach((item) => groupSet.add(item));
    }

    if (this.bounds) {
      // get focus h3 index set
      const backgroundSet = this.getBackgroundH3Set();
      // extract unique values from focus set not in total set
      const uniqueValuesFromBackground = backgroundSet.filter(
        (h3Index) => !groupSet.has(h3Index)
      );
      // assign unique values to return object
      group.background = uniqueValuesFromBackground;
      // add value to total set
      uniqueValuesFromBackground.forEach((item) => groupSet.add(item));
    }

    return group;
  }
}

export default H3Map;
