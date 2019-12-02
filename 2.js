const main = () => {
  let nums = require('fs')
    .readFileSync('./2.in', 'utf8')
    .split(',')
    .filter(n => n)
    .map(Number);

  console.log(nums);

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

  console.log('part 1', nums[0]);
};

if (require.main == module) {
  console.time('main');
  main();
  console.timeEnd('main');
}
