const Intcode = require('./IntcodeComputer');

const NORTH = 1;
const SOUTH = 2;
const WEST = 3;
const EAST = 4;

const WALL = 0;
const MOVED = 1;
const MOVED_OXYGEN_FOUND = 2;

const moveSingle = (program, direction) => {
  program.pushToInput(direction);
  program.execute();

  return program.getOutput();
};

const moveMultiple = (program, directions) => {
  directions.forEach(direction => {
    program.pushToInput(direction);
  });
  program.execute();
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

const getPossibleDirections = (program, lastMove) => {
  const directions = [NORTH, SOUTH, WEST, EAST];

  let possibleDirections = [];

  directions.forEach(direction => {
    const oppositeDirection = getOpositeDirection(direction);
    const status = moveSingle(program, direction);

    if (status !== WALL) {
      if (!lastMove || direction !== getOpositeDirection(lastMove)) {
        possibleDirections.push(direction);
      }

      moveSingle(program, oppositeDirection);
    }
  });

  return possibleDirections;
};

const undoAll = (program, movements) => {
  while (movements.length) {
    const direction = getOpositeDirection(movements.shift());

    moveSingle(program, direction);
  }
};

const main = input => {
  const program = new Intcode(input);
  let branches = [[]];
  let previousMoves = [];

  do {
    const branch = branches.pop();

    previousMoves = [...branch];

    if (previousMoves.length) {
      moveMultiple(program, [...previousMoves]);
    }
    do {
      const possibleDirections = getPossibleDirections(
        program,
        previousMoves[0]
      );

      if (possibleDirections.length === 0) {
        undoAll(program, [...previousMoves]);

        break;
      } else if (possibleDirections.length === 1) {
        previousMoves.unshift(possibleDirections[0]);

        const status = moveSingle(program, possibleDirections[0]);

        if (status === MOVED_OXYGEN_FOUND) {
          console.log('required steps', previousMoves.length);
        }
      } else {
        possibleDirections.forEach(direction =>
          branches.push([direction, ...previousMoves])
        );

        undoAll(program, [...previousMoves]);
        break;
      }
    } while (true);
  } while (branches.length);

  console.log('done');
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}
