const intCode = require('./intCode');

const main = instructions => {
  const inputPermutations = permute([0, 1, 2, 3, 4]);

  let maxOutput = 0;

  for (let permutation of inputPermutations) {
    const a = intCode(instructions, [permutation[0], 0]);
    const b = intCode(instructions, [permutation[1], a]);
    const c = intCode(instructions, [permutation[2], b]);
    const d = intCode(instructions, [permutation[3], c]);
    const output = intCode(instructions, [permutation[4], d]);

    if (output > maxOutput) {
      maxOutput = output;
    }
  }

  return maxOutput;
};

const permute = inputArray => {
  var result = inputArray.reduce(function permute(res, item, key, arr) {
    return res.concat(
      (arr.length > 1 &&
        arr
          .slice(0, key)
          .concat(arr.slice(key + 1))
          .reduce(permute, [])
          .map(perm => [item].concat(perm))) ||
        item
    );
  }, []);
  return result;
};

if (require.main === module) {
  const instructions = require('fs').readFileSync(
    `${__dirname}/input.txt`,
    'utf8'
  );
  console.log('part 1', main(instructions));
}

module.exports = instructions => {
  return main(instructions);
};
