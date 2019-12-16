const tick = moons => {
  moons.forEach(moon => {
    moons
      .filter(item => item.name !== moon.name)
      .forEach(otherMoon => {
        moon.dx += moon.x > otherMoon.x ? -1 : moon.x < otherMoon.x ? 1 : 0;
        moon.dy += moon.y > otherMoon.y ? -1 : moon.y < otherMoon.y ? 1 : 0;
        moon.dz += moon.z > otherMoon.z ? -1 : moon.z < otherMoon.z ? 1 : 0;
      });
  });

  moons.forEach(moon => {
    moon.x += moon.dx;
    moon.y += moon.dy;
    moon.z += moon.dz;
  });
};

const getState = (moons, axis) => moons.map(moon => `${moon[axis]}`).join(',');

const gcd = (a, b) => (!b ? a : gcd(b, a % b));

const lcm = (a, b) => a * (b / gcd(a, b));

const main = input => {
  const moons = [];
  const moonNames = ['io', 'europa', 'ganymede', 'callisto'];

  const inputs = input
    .split('\n')
    .map(line => line.slice(1, -1))
    .map(item => item.split(',').map(item => item.trim().slice(2)));

  inputs.forEach((moon, index) => {
    moons.push({
      name: moonNames[index],
      x: +moon[0],
      y: +moon[1],
      z: +moon[2],
      dx: 0,
      dy: 0,
      dz: 0,
    });
  });

  const initialStates = {
    x: getState(moons, 'x'),
    y: getState(moons, 'y'),
    z: getState(moons, 'z'),
  };

  let step = 1;
  const periods = { x: 0, y: 0, z: 0 };

  while (periods.x === 0 || periods.y === 0 || periods.z === 0) {
    tick(moons);
    step += 1;

    if (periods.x === 0 && getState(moons, 'x') === initialStates.x) {
      periods.x = step;
    }
    if (periods.y === 0 && getState(moons, 'y') === initialStates.y) {
      periods.y = step;
    }
    if (periods.z === 0 && getState(moons, 'z') === initialStates.z) {
      periods.z = step;
    }
  }

  return lcm(lcm(periods.x, periods.y), periods.z);
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 2', main(input));
}

module.exports = main;
