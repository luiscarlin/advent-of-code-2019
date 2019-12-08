const AmplifierController = require('./amplifierController');

const main = instructions => {
  const inputphases = permute([5, 6, 7, 8, 9]);

  let maxOutput = 0;
  let bestPhase = [];

  for (let phase of inputphases) {
    let a = new AmplifierController(instructions, phase[0]);
    let b = new AmplifierController(instructions, phase[1]);
    let c = new AmplifierController(instructions, phase[2]);
    let d = new AmplifierController(instructions, phase[3]);
    let e = new AmplifierController(instructions, phase[4]);

    let aOut = 0;
    let bOut = 0;
    let cOut = 0;
    let dOut = 0;
    let eOut = 0;
    let out = 0;

    while (!e.terminated) {
      a.pushToInputQueue(eOut);
      out = a.execute();

      if (out) {
        aOut = out;
      }

      b.pushToInputQueue(aOut);
      out = b.execute();

      if (out) {
        bOut = out;
      }

      c.pushToInputQueue(bOut);
      out = c.execute();

      if (out) {
        cOut = out;
      }

      d.pushToInputQueue(cOut);
      out = d.execute();

      if (out) {
        dOut = out;
      }

      e.pushToInputQueue(dOut);
      out = e.execute();

      if (out) {
        eOut = out;
      }
    }

    if (eOut > maxOutput) {
      maxOutput = eOut;
      bestPhase = phase;
    }
  }

  return { maxOutput, bestPhase };
};

// const permute = inputArray => {
//   var result = inputArray.reduce(function permute(res, item, key, arr) {
//     return res.concat(
//       (arr.length > 1 &&
//         arr
//           .slice(0, key)
//           .concat(arr.slice(key + 1))
//           .reduce(permute, [])
//           .map(perm => [item].concat(perm))) ||
//         item
//     );
//   }, []);
//   return result;
// };

const permute = (set = []) => {
  const permutations = [];

  const permute = (candidates = [], sequence = []) => {
    if (!candidates.length) {
      permutations.push(sequence);

      return;
    }

    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];

      permute(
        [...candidates.filter(x => x !== candidate)],
        [...sequence, candidate]
      );
    }
  };

  permute(set);

  return permutations;
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
