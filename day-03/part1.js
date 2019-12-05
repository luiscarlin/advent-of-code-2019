const getWireSteps = wire => {
  const steps = new Set();
  position = { x: 0, y: 0 };

  for (let i = 0; i < wire.length; i++) {
    const { direction, numberSteps } = wire[i];

    for (let step = 0; step < numberSteps; step++) {
      position.x += direction === 'L' ? -1 : direction === 'R' ? 1 : 0;
      position.y += direction === 'U' ? 1 : direction === 'D' ? -1 : 0;

      steps.add(`${position.x},${position.y}`);
    }
  }

  return steps;
};

const main = (wire1, wire2) => {
  const wire1Steps = getWireSteps(wire1);
  const wire2Steps = [...getWireSteps(wire2)];

  return wire2Steps
    .filter(step => wire1Steps.has(step))
    .map(common => common.split(',').map(Number))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .sort((a, b) => a - b)[0];
};

if (require.main == module) {
  const [wire1, wire2] = require('fs')
    .readFileSync('./input.txt', 'utf8')
    .split('\n')
    .filter(n => n)
    .map(wire =>
      wire
        .split(',')
        .map(item => ({ direction: item[0], numberSteps: +item.slice(1) }))
    );

  console.log('part 1', main(wire1, wire2));
}

module.exports = (wire1, wire2) => {
  main(wire1, wire2);
};
