const intcode = require('./intcode');

const main = input => {
  const output = intcode(input).split(',');

  let numBlocks = 0;
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
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 2', main(input));
}

module.exports = main;
