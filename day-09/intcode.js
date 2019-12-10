const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;
const RELATIVE_MODE = 2;

const ADD = 1;
const MULTIPLY = 2;
const IN = 3;
const OUT = 4;
const JUMP_IF_NOT_ZERO = 5;
const JUMP_IF_ZERO = 6;
const LESS_THAN = 7;
const EQUALS = 8;
const SET_RELATIVE_BASE = 9;

const main = (instructions, input = []) => {
  let memory = instructions.split(',').map(Number);
  let pc = 0;
  let relativeBase = 0;
  let output = [];

  const accessMemory = position => {
    return memory[position] || 0;
  };

  const getValue = (mode, position) => {
    switch (mode) {
      case POSITION_MODE:
        return accessMemory(accessMemory(position));
      case IMMEDIATE_MODE:
        return accessMemory(position);
      case RELATIVE_MODE:
        return accessMemory(accessMemory(position) + relativeBase);
    }
  };

  const getAddress = (mode, position) => {
    switch (mode) {
      case POSITION_MODE:
        return accessMemory(position);
      case RELATIVE_MODE:
        return accessMemory(position) + relativeBase;
    }
  };

  while (accessMemory(pc) !== 99) {
    const instruction = `${accessMemory(pc)}`.padStart(5, '0');
    const opcode = +instruction.slice(3);

    const [
      parameter3Mode,
      parameter2Mode,
      parameter1Mode,
      ..._
    ] = instruction.split('').map(Number);

    if (opcode === ADD) {
      const parameter1 = getValue(parameter1Mode, pc + 1);
      const parameter2 = getValue(parameter2Mode, pc + 2);
      const resultPointer = getAddress(parameter3Mode, pc + 3);

      memory[resultPointer] = parameter1 + parameter2;

      pc += 4;
    } else if (opcode === MULTIPLY) {
      const parameter1 = getValue(parameter1Mode, pc + 1);
      const parameter2 = getValue(parameter2Mode, pc + 2);
      const resultPointer = getAddress(parameter3Mode, pc + 3);

      memory[resultPointer] = parameter1 * parameter2;

      pc += 4;
    } else if (opcode === IN) {
      const resultPointer = getAddress(parameter1Mode, pc + 1);

      memory[resultPointer] = input.shift();

      pc += 2;
    } else if (opcode === OUT) {
      output.push(getValue(parameter1Mode, pc + 1));

      pc += 2;
    } else if (opcode === JUMP_IF_NOT_ZERO) {
      const parameter1 = getValue(parameter1Mode, pc + 1);
      const parameter2 = getValue(parameter2Mode, pc + 2);

      pc = parameter1 !== 0 ? parameter2 : pc + 3;
    } else if (opcode === JUMP_IF_ZERO) {
      const parameter1 = getValue(parameter1Mode, pc + 1);
      const parameter2 = getValue(parameter2Mode, pc + 2);

      pc = parameter1 === 0 ? parameter2 : pc + 3;
    } else if (opcode === LESS_THAN) {
      const parameter1 = getValue(parameter1Mode, pc + 1);
      const parameter2 = getValue(parameter2Mode, pc + 2);
      const resultPointer = getAddress(parameter3Mode, pc + 3);

      memory[resultPointer] = parameter1 < parameter2 ? 1 : 0;

      pc += 4;
    } else if (opcode === EQUALS) {
      const parameter1 = getValue(parameter1Mode, pc + 1);
      const parameter2 = getValue(parameter2Mode, pc + 2);
      const resultPointer = getAddress(parameter3Mode, pc + 3);

      memory[resultPointer] = parameter1 === parameter2 ? 1 : 0;

      pc += 4;
    } else if (opcode === SET_RELATIVE_BASE) {
      const parameter1 = getValue(parameter1Mode, pc + 1);

      relativeBase += parameter1;

      pc += 2;
    }
  }

  return output.join(',');
};

module.exports = main;
