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

  for (let point1 of asteroidsCoordinates) {
    let angles = new Set();

    for (let point2 of asteroidsCoordinates) {
      const [x1, y1] = point1;
      const [x2, y2] = point2;

      if (!(x1 === x2 && y1 === y2)) {
        angles.add(Math.atan2(y2 - y1, x2 - x1));
      }
    }
    directViews[[point1]].push(...angles);
  }

  const maxDirectViewsKey = Object.keys(directViews).sort(
    (a, b) => directViews[b].length - directViews[a].length
  )[0];

  return {
    location: maxDirectViewsKey.split(',').map(Number),
    asteroids: directViews[maxDirectViewsKey].length,
  };
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
