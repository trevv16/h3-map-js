type Coordinates = [number, number];
type Polygon = Coordinates[];
type MultiPolygon = Polygon[];

interface IBounds {
  ne: Coordinates;
  sw: Coordinates;
}

interface ILatLng {
  lat: number;
  lng: number;
}

type H3Index = string;
type H3Set = H3Index[];
