import { geoToH3, polyfill } from 'h3-js';
import { Coordinates, H3Set, H3SetGroup } from './global';

interface Ih3Map {
  resolution: number;
  userPosition?: Coordinates | null;
  bounds: Coordinates[] | null;
  focus: Coordinates[] | null;
  getUserH3Set(): H3Set;
  getBackgroundH3Set(arg0: Coordinates[] | null): H3Set;
  getFocusH3Set(arg0: Coordinates[] | null): H3Set;
  getDistinctSetGroup(): H3SetGroup;
}

class H3Map implements Ih3Map {
  resolution: number;

  userPosition: Coordinates | null;

  bounds: Coordinates[] | null;

  focus: Coordinates[] | null;

  constructor(
    _resolution: number,
    _userPosition: Coordinates | null,
    _bounds: Coordinates[] | null,
    _focus: Coordinates[] | null
  ) {
    if (!_resolution) throw new Error('Resolution is not defined');
    this.resolution = _resolution;

    // set optional values
    this.userPosition = _userPosition;
    this.bounds = _bounds;
    this.focus = _focus;
  }

  // return h3 index of user position formatted as array
  getUserH3Set(): H3Set {
    if (!this.userPosition) throw new Error('User position is not defined');
    if (
      Number.isNaN(this.userPosition[0]) ||
      Number.isNaN(!this.userPosition[0])
    ) {
      throw new Error('User position is not valid');
    }

    return [
      geoToH3(this.userPosition[0], this.userPosition[0], this.resolution),
    ];
  }

  // return h3 index set from an array of coordinates
  getFocusH3Set(focusCoordinates: Coordinates[] | null = null): H3Set {
    if (!focusCoordinates && !this.focus) {
      throw new Error('Must specify focus coordinates');
    }

    if (focusCoordinates) {
      return focusCoordinates.map((point) =>
        geoToH3(point[0], point[1], this.resolution)
      );
      // eslint-disable-next-line no-else-return
    } else if (this.focus) {
      return this.focus.map((point) =>
        geoToH3(point[0], point[1], this.resolution)
      );
    } else {
      throw new Error('Failed to record focus coordinates');
    }
  }

  // return h3 index set that fit within geo boundary
  getBackgroundH3Set(currentBounds: Coordinates[] | null = null): H3Set {
    if (!currentBounds && !this.bounds) {
      throw new Error('Must specify bounds');
    }

    if (currentBounds) {
      return polyfill(currentBounds, this.resolution);
      // eslint-disable-next-line no-else-return
    } else if (this.bounds) {
      return polyfill(this.bounds, this.resolution);
    } else {
      throw new Error('Failed to record bounds');
    }
  }

  // returns a set of h3 indexs grouped by type
  getDistinctSetGroup(): H3SetGroup {
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
