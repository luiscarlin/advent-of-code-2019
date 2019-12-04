const main = (start, end) => {
  return validNumbersInRange(start, end);
};

const validNumbersInRange = (start, end) => {
  let countValid = 0;
  for (let num = start; num <= end; num++) {
    if (isValidNum(num)) {
      countValid++;
    }
  }
  return countValid;
};

const isValidNum = num => {
  num = `${num}`;

  let twoAdjacentDigits = false;
  let neverDecrease = true;

  for (let i = 0; i < num.length; i++) {
    if (num[i] === num[i + 1]) {
      twoAdjacentDigits = true;
    }

    if (num[i] > num[i + 1]) {
      neverDecrease = false;
    }
  }

  return twoAdjacentDigits && neverDecrease;
};

if (require.main === module) {
  const [start, end] = require('fs')
    .readFileSync('./input.txt', 'utf8')
    .split('-')
    .map(Number);

  console.log('part 1', main(start, end));
}

module.exports = (start, end) => {
  return main(start, end);
};
