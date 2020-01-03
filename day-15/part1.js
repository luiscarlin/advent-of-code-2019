const Intcode = require('./IntcodeComputer');

const main = input => {
  const program = new Intcode(input);

  console.log(input);

  // find all neighbors

  // test out around
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}
