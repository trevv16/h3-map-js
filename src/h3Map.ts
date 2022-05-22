interface Ih3Map {
  resolution: number;
  userPosition: ILatLng;
  bounds?: IBounds;
  focus?: ILatLng[];
  getBackgroundH3Set(): H3Set;
  getUserH3Set(): H3Set;
  getFocusH3Set(): H3Set;
}

class h3Map implements Ih3Map {
  resolution: number;

  userPosition: ILatLng;

  bounds?: IBounds;

  focus?: ILatLng[];

  constructor(
    _resolution: number,
    _userPosition: ILatLng,
    _bounds: IBounds,
    _focus: ILatLng[]
  ) {
    this.resolution = _resolution;
    this.userPosition = _userPosition;
    this.bounds = _bounds;
    this.focus = _focus;
  }
}

export default h3Map;
