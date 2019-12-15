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

  const iterations = 1000;

  for (let i = 0; i < iterations; i++) {
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
  }

  return calculateEnergy(moons);
};

const calculateEnergy = moons => {
  let total = 0;

  moons.forEach(moon => {
    let potentialEnergy =
      Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
    let kineticEnergy =
      Math.abs(moon.dx) + Math.abs(moon.dy) + Math.abs(moon.dz);

    total += potentialEnergy * kineticEnergy;
  });

  return total;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
