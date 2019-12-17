const IntcodeComputer = require('./IntcodeComputer');

const main = instructions => {
  let computer = new IntcodeComputer(instructions);

  while (!computer.terminated) {
    computer.execute();
  }

  output.forEach((num, index) => {
    if ((index + 1) % 3 === 0) {
      if (num === '2') {
        numBlocks++;
      }
    }
  });

  return numBlocks;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input2.txt`, 'utf8');
  console.log('part 2', main(input));
}

module.exports = main;
