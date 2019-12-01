const main = () => {
  let lines = require('fs')
    .readFileSync('./1.in', 'utf8')
    .split('\n');

  const sum = lines
    .map(line => calculateFuel(line))
    .reduce((acc, val) => acc + val);

  console.log('part 1', sum);

  const sumAllFuel = lines
    .map(line => getRecursiveFuel(line))
    .reduce((acc, val) => acc + val);

  console.log('part 2', sumAllFuel);
};

const calculateFuel = num => Math.floor(+num / 3) - 2;

const getRecursiveFuel = (num, sum = 0) => {
  const fuel = calculateFuel(num);

  return fuel < 0 ? sum : getRecursiveFuel(fuel, (sum += fuel));
};

if (require.main == module) {
  console.time('timer');
  main();
  console.timeEnd('timer');
}
