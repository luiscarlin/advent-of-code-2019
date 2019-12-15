const main = input => {
  const something = input
    .split('\n')
    .map(line => line.slice(1, -1))
    .map(item => item.split(',').map(item => item.trim().slice(2)));

  let moon1 = {
    x: something[0][0],
    y: something[0][1],
    z: something[0][2],
    dx: 0,
    dy: 0,
    dz: 0,
  };
  let moon2 = {
    x: something[1][0],
    y: something[1][1],
    z: something[1][2],
    dx: 0,
    dy: 0,
    dz: 0,
  };
  let moon3 = {
    x: something[2][0],
    y: something[2][1],
    z: something[2][2],
    dx: 0,
    dy: 0,
    dz: 0,
  };
  let moon4 = {
    x: something[3][0],
    y: something[3][1],
    z: something[3][2],
    dx: 0,
    dy: 0,
    dz: 0,
  };

  console.log(something);
  return input;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
