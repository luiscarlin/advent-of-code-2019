const main = input => {
  let asteroidsCoordinates = [];
  let directViews = {};

  input
    .split('\n')
    .forEach((row, y) =>
      row
        .split('')
        .forEach((item, x) => item === '#' && asteroidsCoordinates.push([x, y]))
    );

  asteroidsCoordinates.forEach(coordinate => (directViews[coordinate] = []));

  // console.log(asteroidsCoordinates);
  // console.log(directViews);

  for (let point1 of asteroidsCoordinates) {
    for (let point2 of asteroidsCoordinates) {
      if (point1 !== point2) {
        // calculate line

        const [x1, y1] = point1;
        const [x2, y2] = point2;

        const slope = (y2 - y1) / (x2 - x1);
        const b = y1 - slope * x1;

        // y = slope * x + b

        let isPoint2InDirectView = true;

        for (let point3 of asteroidsCoordinates) {
          if (point3 !== point1 && point3 !== point2) {
            if (isPointInLine(slope, b, point3)) {
              isPoint2InDirectView = false;
              break;
            }
          }
        }

        if (isPoint2InDirectView) {
          directViews[point1].push(point2);
        }
      }
    }
  }

  // console.log(directViews);

  const maxDirectViewsKey = Object.keys(directViews).sort(
    (a, b) => directViews[b].length - directViews[a].length
  )[0];

  console.log('max', directViews[maxDirectViewsKey].length);
  return {
    location: maxDirectViewsKey.split(',').map(Number),
    asteroids: directViews[maxDirectViewsKey].length,
  };

  return 1;
};

const isPointInLine = (slope, b, point3) => {
  const [x, y] = point3;
  return y === slope * x + b;
};

if (require.main === module) {
  console.log('part 1', main());
}

module.exports = main;
