const main = () => {
  console.log('part 1', getOutput(12, 2));

  for (let first = 0; first <= 99; first += 1) {
    for (let second = 0; second <= 99; second += 1) {
      const result = getOutput(first, second);

      if (result === 19690720) {
        console.log('part 2', 100 * first + second);
        process.exit();
      }
    }
  }
};

const getOutput = (first, second) => {
  let nums = require('fs')
    .readFileSync('./2.in', 'utf8')
    .split(',')
    .filter(n => n)
    .map(Number);

  nums[1] = first;
  nums[2] = second;

  for (let i = 0; i < nums.length; i += 4) {
    let opcode = nums[i];
    if (opcode === 99) {
      break;
    }

    let firstOperand = nums[nums[i + 1]];
    let secondOperand = nums[nums[i + 2]];
    let resultPlace = nums[i + 3];

    nums[resultPlace] =
      opcode === 1
        ? firstOperand + secondOperand
        : firstOperand * secondOperand;
  }

  return nums[0];
};

if (require.main == module) {
  console.time('main');
  main();
  console.timeEnd('main');
}
