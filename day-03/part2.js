const directions = {
  U: 0,
  R: 1,
  D: 2,
  L: 3,
};

dx = [0, 1, 0, -1];
dy = [1, 0, -1, 0];

let grid = {};

const findMinManhattan = () => {
  let minManhattan = 1000000;

  for (let [key, val] of Object.entries(grid)) {
    if (val > 1) {
      const [x, y] = key.split(',');
      manhattan = Math.abs(x) + Math.abs(y);

      if (manhattan < minManhattan) {
        minManhattan = manhattan;
      }
    }
  }
  return minManhattan;
};

const findMinSteps = () => {
  let minTotalLength = 1000000;

  for (let [key, val] of Object.entries(grid)) {
    if (val > 1) {
      // intersection found

      const totalLength = pointsWire1.get(key) + pointsWire2.get(key);

      if (totalLength < minTotalLength) {
        minTotalLength = totalLength;
      }
    }
  }

  return minTotalLength;
};

const addToGrid = (x, y) => {
  grid[[x, y]] = grid[[x, y]] ? (grid[[x, y]] += 1) : 1;
};

let pointsWire1 = new Map();
let pointsWire2 = new Map();

const populateGridWithWire = (wire, points) => {
  let prevX = 0;
  let prevY = 0;
  let points2 = new Set();

  let length = 0;

  for (let item of wire) {
    const direction = item[0];
    const steps = item.slice(1);

    const curX = prevX + dx[directions[direction]] * steps;
    const curY = prevY + dy[directions[direction]] * steps;

    if ('UD'.includes(direction)) {
      for (let y = prevY; y != curY; y += dy[directions[direction]]) {
        if (y == prevY) continue;
        points.set(`${prevX},${y}`, ++length);
        points2.add(`${prevX},${y}`);
      }
    }

    if ('RL'.includes(direction)) {
      for (let x = prevX; x != curX; x += dx[directions[direction]]) {
        if (x == prevX) continue;
        points.set(`${x},${prevY}`, ++length);
        points2.add(`${x},${prevY}`);
      }
    }

    points.set(`${curX},${curY}`, ++length);
    points2.add(`${curX},${curY}`);

    prevX = curX;
    prevY = curY;
  }

  points2.forEach(point => addToGrid(...point.split(',')));
};

const main = () => {
  let [wire1, wire2] = require('fs')
    .readFileSync('./3.in', 'utf8')
    .split('\n')
    .filter(n => n);

  addToGrid(0, 0);

  populateGridWithWire(wire1.split(','), pointsWire1);
  populateGridWithWire(wire2.split(','), pointsWire2);

  console.log('part 2', findMinSteps());
};

if (require.main == module) {
  console.time('main');
  main();
  console.timeEnd('main');
}
