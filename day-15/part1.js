const IntcodeComputer = require('./IntcodeComputer');

const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;

const WALL = 0;
const MOVED = 1;
const MOVED_HIT_OXYGEN = 2;

const DROID = 'D';

const print = grid => {
  console.clear();
  console.log(grid);
};

const main = input => {
  const computer = new IntcodeComputer(input);

  // input instructions = nswe = 1234 (other ones are invalid)
  // walks same distance

  // status codes
  // 0 => hit a wall (no change in position)
  // 1 => moved one step
  // 2 => moved one step => new position = position of oxygen system

  let grid = {};
  let currentDroidPosition = [0, 0];
  let movesToOxygen = 0

  let direction = NORTH;

  grid.computer.pushToInput(direction);
  computer.execute();
  let status = computer.getOutput();

  if (status === MOVED) {
    moveDroid(NORTH);
  }
  if (status === MOVED_HIT_OXYGEN) {
    movesToOxygen = 
  }

  print(grid)

  return movesToOxygen

  // pass input for movement
  // wait for output
  // output = status on the movement
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
