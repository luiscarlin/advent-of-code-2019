const getAngleToPointFromReferenceInDegrees = (refX, refY, x, y) => {
  return Math.atan2(y - refY, x - refX) * (180 / Math.PI);
};

const getDistaceBetweenPoints = (x1, y1, x, y) => {
  return Math.hypot(x1 - x, y1 - y);
};

const getTargetsInDescendingOrder = (input, stationX, stationY) => {
  return input
    .split('\n')
    .reduce((coordinatesList, line, y) => {
      line.split('').forEach((item, x) => {
        if (item === '#' && !(stationX === x && stationY === y)) {
          coordinatesList.push({
            x,
            y,
            degrees: getAngleToPointFromReferenceInDegrees(
              stationX,
              stationY,
              x,
              y
            ),
            distance: getDistaceBetweenPoints(x, y, stationX, stationY),
          });
        }
      });

      return coordinatesList;
    }, [])
    .sort((a, b) => a.degrees - b.degrees);
};

const main = input => {
  const stationX = 31;
  const stationY = 20;

  let targetsInDescendingOrder = getTargetsInDescendingOrder(
    input,
    stationX,
    stationY
  );

  const visibleTargets = [
    ...new Set(targetsInDescendingOrder.map(({ degrees }) => degrees)),
  ];

  // the coordinate system is flipped, so we're pointing up in reality
  let currentTargetIndex = visibleTargets.findIndex(degrees => degrees === -90);

  let counter = 0;

  while (targetsInDescendingOrder.length) {
    const visibleTarget = targetsInDescendingOrder
      .filter(({ degrees }) => degrees === visibleTargets[currentTargetIndex])
      .sort((a, b) => a.distance - b.distance)[0];

    if (visibleTarget) {
      // blast asteroid by removing it from list of targets
      targetsInDescendingOrder = targetsInDescendingOrder.filter(
        ({ x, y }) => !(x === visibleTarget.x && y === visibleTarget.y)
      );

      if (++counter === 200) {
        return visibleTarget.x * 100 + visibleTarget.y;
      }
    }

    currentTargetIndex =
      currentTargetIndex < visibleTargets.length ? currentTargetIndex + 1 : 0;
  }
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 2', main(input));
}

module.exports = main;
