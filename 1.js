const main = () => {
  let lines = require('fs')
    .readFileSync('./1.in', 'utf8')
    .split('\n')
    .filter(n => n);

  lines = lines.map(Number);

  console.log('part 1', lines.map(calculateFuel).reduce(sum));
  console.log('part 2', lines.map(num => getRecursiveFuel(num)).reduce(sum));
};

const calculateFuel = num => Math.floor(num / 3) - 2;

const getRecursiveFuel = (num, sum = 0) => {
  const fuel = calculateFuel(num);

  return fuel < 0 ? sum : getRecursiveFuel(fuel, (sum += fuel));
};

const sum = (a, b) => a + b;

if (require.main == module) {
  console.time('timer');
  main();
  console.timeEnd('timer');
}
