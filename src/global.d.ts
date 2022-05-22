export type Coordinates = [number, number];
export type Polygon = Coordinates[];
export type MultiPolygon = Polygon[];

export interface IBounds {
  ne: Coordinates;
  sw: Coordinates;
}

export interface ILatLng {
  lat: number;
  lng: number;
}

export type H3Index = string;
export type H3Set = H3Index[];

export interface H3SetGroup {
  background: H3Set;
  focus: H3Set;
  user: H3Set;
}
