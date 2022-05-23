import H3Map from 'h3-map-js';

// 4 point rectangle bounds of map context
const bounds = [
  [10, 10],
  [-10, 10],
  [10, -10],
  [-10, -10],
];

// data points within map context
const focusPoints = [
  [1, 1],
  [5, 5],
  [-1, -1],
  [-5, -5],
];

// instance of map at current context
const mapContext = new H3Map(1, [0, 0], bounds, focusPoints);

// get user position h3 index
mapContext.getUserH3Set();

// get h3 index set within bounds
mapContext.getBackgroundH3Set();

// get h3 index set for focus data points
mapContext.getFocusH3Set();

// default grouping for map
mapContext.getDistinctSetGroup();
