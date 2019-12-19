const IntcodeComputer = require('./IntcodeComputer');

const printFull = grid => {
  const keys = Object.keys(grid).map(key => key.split(','));

  const xList = keys.map(coord => +coord[0]);
  const yList = keys.map(coord => +coord[1]);

  const maxX = Math.max(...xList);
  const minX = Math.min(...xList);
  const maxY = Math.max(...yList);
  const minY = Math.min(...yList);

  const charToPrint = ['.', '#'];

  console.clear();

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const value = grid[[x, y]];
      process.stdout.write(charToPrint[value] || 'O');
    }
    console.log();
  }
};

const print = (grid, startX, startY) => {
  const charToPrint = ['.', '#'];

  process.stdout.write('\ntop row\n');

  for (let dx = 0; dx < 100; dx++) {
    const value = grid[[startX + dx, startY]];
    process.stdout.write(charToPrint[value] || 'o');
  }
  process.stdout.write('\nleft column\n');

  for (let dy = 0; dy < 100; dy++) {
    const value = grid[[startX, startY + dy]];
    process.stdout.write(charToPrint[value] || 'o');
  }

  console.log('\n--------\n');
};

const main = instructions => {
  let output;

  let startX = 1027;
  let startY = 848;

  let topLeftCorner = {};

  while (true) {
    let grid = {};

    for (let y = startY; y < startY + 100; y++) {
      for (let x = startX; x < startX + 100; x++) {
        const computer = new IntcodeComputer(instructions);

        computer.pushToInput(x);
        computer.pushToInput(y);
        computer.execute();
        output = computer.getOutput();

        grid[[x, y]] = output;
      }
    }

    // print(grid, startX, startY);
    // printFull(grid);

    console.log('top left', startX, startY);

    const allTopRow = topRowInBeam(grid, startX, startY);
    const allLeftColInBeam = leftColumnInBeam(grid, startX, startY);

    if (!allTopRow) {
      startY += 1;
    }

    if (!allLeftColInBeam) {
      startX += 1;
    }

    if (allTopRow && allLeftColInBeam) {
      topLeftCorner = { x: startX, y: startY };
      break;
    }
  }

  // print(grid);

  console.log(topLeftCorner);

  return topLeftCorner.x * 10000 + topLeftCorner.y;
};

const leftColumnInBeam = (grid, startX, startY) => {
  for (let dy = 0; dy < 100; dy++) {
    if (grid[[startX, startY + dy]] == 0) {
      return false;
    }
  }

  return true;
};

const topRowInBeam = (grid, startX, startY) => {
  for (let dx = 0; dx < 100; dx++) {
    if (grid[[startX + dx, startY]] == 0) {
      return false;
    }
  }
  return true;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 2', main(input));
}

module.exports = main;
