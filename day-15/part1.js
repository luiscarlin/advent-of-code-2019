const Intcode = require('./IntcodeComputer');

const populateNeighbors = (program, position) => {
  return {};
};

const main = input => {
  const program = new Intcode(input);

  // N
  program.pushToInput(1);
  program.execute();

  console.log(program.getOutput());

  // S
  program.pushToInput(2);
  program.execute();

  console.log(program.getOutput());

  // S
  program.pushToInput(2);
  program.execute();

  console.log(program.getOutput());

  // find all neighbors

  // test out around
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}
