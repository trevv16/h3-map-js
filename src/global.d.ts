export type Coordinates = [number, number];

export type H3Index = string;
export type H3Set = H3Index[];

export interface H3SetGroup {
  background: H3Set;
  focus: H3Set;
  user: H3Set;
}
