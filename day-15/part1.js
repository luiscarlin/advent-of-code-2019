const Intcode = require('./IntcodeComputer');

const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;

const move = (program, direction) => {
  program.pushToInput(direction);
  program.execute();

  return program.getOutput();
};

const getOpositeDirection = direction => {
  return direction === NORTH
    ? SOUTH
    : direction === SOUTH
    ? NORTH
    : direction === WEST
    ? EAST
    : WEST;
};

const getPossibleDirections = program => {
  const directions = [NORTH, SOUTH, WEST, EAST];
  let possibleDirections = [];

  directions.forEach(direction => {
    const oppositeDirection = getOpositeDirection(direction);
    const status = move(program, direction);

    if (status === 1) {
      possibleDirections.push(direction);
      move(program, oppositeDirection);
    }
  });

  return possibleDirections;
};

const main = input => {
  const program = new Intcode(input);

  const possibleDirections = getPossibleDirections(program);

  console.log(possibleDirections);
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}
