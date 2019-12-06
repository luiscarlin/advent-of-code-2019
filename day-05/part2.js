const main = (program, input) => {
  let memory = program.split(',').map(Number);

  let output = -1;
  let pc = 0;

  const getParameterBasedOnMode = (mode, pointer) => {
    const valueAtPointer = memory[pointer];
    return mode === 0 ? memory[valueAtPointer] : valueAtPointer;
  };

  while (memory[pc] !== 99) {
    const instruction = `${memory[pc]}`.padStart(5, '0');

    const opcode = +instruction.slice(3);

    const [
      thirdParamMode,
      secondParamMode,
      firstParamMode,
      ..._
    ] = instruction.split('').map(Number);

    switch (opcode) {
      case 1:
        parameter1 = getParameterBasedOnMode(firstParamMode, pc + 1);
        parameter2 = getParameterBasedOnMode(secondParamMode, pc + 2);
        resultPointer = memory[pc + 3];

        memory[resultPointer] = parameter1 + parameter2;
        pc += 4;
        break;

      case 2:
        parameter1 = getParameterBasedOnMode(firstParamMode, pc + 1);
        parameter2 = getParameterBasedOnMode(secondParamMode, pc + 2);
        resultPointer = memory[pc + 3];

        memory[resultPointer] = parameter1 * parameter2;
        pc += 4;
        break;

      case 3:
        resultPointer = memory[pc + 1];

        memory[resultPointer] = input;
        pc += 2;
        break;

      case 4:
        output = getParameterBasedOnMode(firstParamMode, pc + 1);
        pc += 2;
        break;

      case 5:
        parameter1 = getParameterBasedOnMode(firstParamMode, pc + 1);
        parameter2 = getParameterBasedOnMode(secondParamMode, pc + 2);

        pc = parameter1 !== 0 ? parameter2 : pc + 3;
        break;

      case 6:
        parameter1 = getParameterBasedOnMode(firstParamMode, pc + 1);
        parameter2 = getParameterBasedOnMode(secondParamMode, pc + 2);

        pc = parameter1 === 0 ? parameter2 : pc + 3;
        break;

      case 7:
        parameter1 = getParameterBasedOnMode(firstParamMode, pc + 1);
        parameter2 = getParameterBasedOnMode(secondParamMode, pc + 2);
        resultPointer = memory[pc + 3];

        memory[resultPointer] = parameter1 < parameter2 ? 1 : 0;
        pc += 4;
        break;

      case 8:
        parameter1 = getParameterBasedOnMode(firstParamMode, pc + 1);
        parameter2 = getParameterBasedOnMode(secondParamMode, pc + 2);
        resultPointer = memory[pc + 3];

        memory[resultPointer] = parameter1 === parameter2 ? 1 : 0;
        pc += 4;
        break;
    }
  }

  return output;
};

if (require.main === module) {
  const program = require('fs').readFileSync('./input.txt', 'utf8');

  console.log('part 2', main(program, 5));
}

module.exports = program => main(program);
