const IntcodeComputer = require('./IntcodeComputer');

const main = instructions => {
  let output;
  let affectedByBeam = 0;

  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      const computer = new IntcodeComputer(instructions);

      computer.pushToInput(x);
      computer.pushToInput(y);
      computer.execute();
      output = computer.getOutput();

      if (output === 1) {
        affectedByBeam++;
      }
    }
  }

  return affectedByBeam;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
