# H3-Map.js

<!-- badges: start -->

[![H3
Version](https://img.shields.io/badge/h3-v3.7.2-blue.svg)](https://github.com/uber/h3/releases/tag/v3.7.2)

<!-- badges: end -->

[![Usage of uber/h3](https://1fykyq3mdn5r21tpna3wkdyi-wpengine.netdna-ssl.com/wp-content/uploads/2018/06/image13-e1529950174302.png 'Shiprock, New Mexico by Beau Rogers')](https://eng.uber.com/h3/)

The goal of this project is to provide a proper workflow for working with [uber/h3](https://github.com/uber/h3) by using the h3 API in the context of a map. H3 is a `Hexagonal hierarchical geospatial indexing system` created and used by uber most notably display surge regions on their app in the form of hexagons.

If you want to use h3 in your map there are a few practices that will make your map render appropriatelly and life easier and this project aims to help you implement this feature sucessfully.

## Install

`npm i h3-map-js`

## Getting Started

```javascript
import H3Map from 'h3-map-js';

// 4 point rectangle bounds of map context
// formatted at [lat, long]
const bounds = [
  [10, 10],
  [-10, 10],
  [10, -10],
  [-10, -10],
];

// data points within map context
// formatted at [lat, long]
const focusPoints = [
  [1, 1],
  [5, 5],
  [-1, -1],
  [-5, -5],
];

// instance of map at current context
const mapResolution = 1;
const userPosition = [0, 0];
const mapContext = new H3Map(mapResolution, userPosition, bounds, focusPoints);

// get user position h3 index
mapContext.getUserH3Set();

// get h3 index set within bounds
mapContext.getBackgroundH3Set();

// get h3 index set for focus data points
mapContext.getFocusH3Set();
```

#### Rendering a Map

```javascript
// returns unique sets grouped by type
mapContext.getDistinctSetGroup();
```
