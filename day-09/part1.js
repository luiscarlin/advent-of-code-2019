const AmplifierController = require('./amplifierController');

const main = input => {
  let controller = new AmplifierController(input);
  const output = controller.execute();

  return output;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
