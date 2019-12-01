const main = () => {
  let lines = require('fs')
    .readFileSync('./1.in', 'utf8')
    .split('\n');

  const sum = lines
    .map(line => Math.floor(+line / 3) - 2)
    .reduce((acc, val) => acc + val);

  console.log('part 1', sum);
};

if (require.main == module) {
  main();
}
