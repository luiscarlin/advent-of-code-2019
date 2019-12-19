const main = input => {
  return input;

  // input instructions = nswe = 1234 (other ones are invalid)
  // walks same distance

  // status codes
  // 0 => hit a wall (no change in position)
  // 1 => moved one step
  // 2 => moved one step => new position = position of oxygen system

  while (true) {
    // pass input for movement
    // wait for output
    // output = status on the movement
  }
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
