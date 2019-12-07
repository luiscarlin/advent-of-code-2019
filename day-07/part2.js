const intCode = require('./intCode');

const main = instructions => {
  const inputphases = permute([5, 6, 7, 8, 9]);

  let maxOutput = 0;
  let bestPhase = [];
  let output = 0;

  for (let phase of inputphases) {
    const a = intCode(instructions, [phase[0], output]);
    const b = intCode(instructions, [phase[1], a]);
    const c = intCode(instructions, [phase[2], b]);
    const d = intCode(instructions, [phase[3], c]);
    output = intCode(instructions, [phase[4], d]);
    // console.log(output);

    if (output > maxOutput) {
      maxOutput = output;
      bestPhase = phase;
    }
  }

  return { maxOutput, bestPhase };
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
  console.log('part 2', main(instructions).maxOutput);
}

module.exports = instructions => {
  return main(instructions);
};
