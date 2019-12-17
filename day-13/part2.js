const IntcodeComputer = require('./IntcodeComputer');

const print = grid => {
  const keys = Object.keys(grid).map(key => key.split(','));

  const xList = keys.map(coord => +coord[0]);
  const yList = keys.map(coord => +coord[1]);

  const maxX = Math.max(...xList);
  const minX = Math.min(...xList);
  const maxY = Math.max(...yList);
  const minY = Math.min(...yList);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const value = grid[[x, y]];
      process.stdout.write(`${value}`);

      // if (value === 0) {
      //   process.stdout.write(' ');
      // } else {
      //   process.stdout.write('#');
      // }
    }
    console.log();
  }
};
const main = instructions => {
  let computer = new IntcodeComputer(instructions);

  let grid = {};

  while (!computer.terminated) {
    halted = computer.execute();
    paddle = { x: 0, y: 0 };
    ball = { x: 0, y: 0 };
    score = 0;

    while (computer.output.length > 0) {
      x = computer.getOutput();
      y = computer.getOutput();
      id = computer.getOutput();

      if (x === -1 && y === 0) {
        score = id;
        continue;
      }

      if (id === 3) {
        paddle.x = x;
        paddle.y = y;
      }

      if (id === 4) {
        ball.x = x;
        ball.y = y;
      }
      grid[[x, y]] = id;
    }

    if (computer.output.length === 0) {
      print(grid);
      break;
    }
  }
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input2.txt`, 'utf8');
  console.log('part 2', main(input));
}

module.exports = main;
