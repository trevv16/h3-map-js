# H3-Map.js

<!-- badges: start -->

[![H3
Version](https://img.shields.io/badge/h3-v3.7.2-blue.svg)](https://github.com/uber/h3/releases/tag/v3.7.2)

<!-- badges: end -->

A utility built with uber/h3-js to define the context of a map and manipulate its sub components

## Install

`npm i h3-map-js`

## Basic Usage

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
const mapContext = new H3Map(1, [0, 0], bounds, focusPoints);

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
