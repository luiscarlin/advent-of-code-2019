const main = input => {
  return input;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__filename}/input.txt`);
  console.log('part 1', main(input));
}

module.exports = main;
