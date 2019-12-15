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
const HALT = 99;

class IntCodeComputer {
  constructor(instructions, input) {
    this.memory = instructions.split(',').map(Number);
    this.inputQueue = input ? [input] : [];
    this.output = -1;
    this.pc = 0;
    this.terminated = false;
    this.relativeBase = 0;
  }

  accessMemory(position) {
    return this.memory[position] || 0;
  }

  getValue(mode, position) {
    switch (mode) {
      case POSITION_MODE:
        return this.accessMemory(this.accessMemory(position));
      case IMMEDIATE_MODE:
        return this.accessMemory(position);
      case RELATIVE_MODE:
        return this.accessMemory(
          this.accessMemory(position) + this.relativeBase
        );
    }
  }

  getAddress(mode, position) {
    switch (mode) {
      case POSITION_MODE:
        return this.accessMemory(position);
      case RELATIVE_MODE:
        return this.accessMemory(position) + this.relativeBase;
    }
  }

  execute(input) {
    if (input) {
      this.inputQueue.push(input);
    }

    while (!this.terminated) {
      const instruction = `${this.accessMemory(this.pc)}`.padStart(5, '0');
      const opcode = +instruction.slice(3);

      const [
        parameter3Mode,
        parameter2Mode,
        parameter1Mode,
        ..._
      ] = instruction.split('').map(Number);

      if (opcode === ADD) {
        const parameter1 = this.getValue(parameter1Mode, this.pc + 1);
        const parameter2 = this.getValue(parameter2Mode, this.pc + 2);
        const resultPointer = this.getAddress(parameter3Mode, this.pc + 3);

        this.memory[resultPointer] = parameter1 + parameter2;

        this.pc += 4;
      } else if (opcode === MULTIPLY) {
        const parameter1 = this.getValue(parameter1Mode, this.pc + 1);
        const parameter2 = this.getValue(parameter2Mode, this.pc + 2);
        const resultPointer = this.getAddress(parameter3Mode, this.pc + 3);

        this.memory[resultPointer] = parameter1 * parameter2;

        this.pc += 4;
      } else if (opcode === IN) {
        const resultPointer = this.getAddress(parameter1Mode, this.pc + 1);

        this.memory[resultPointer] = this.inputQueue.shift();

        this.pc += 2;
      } else if (opcode === OUT) {
        this.output = this.getValue(parameter1Mode, this.pc + 1);
        this.pc += 2;
        return this.output;
      } else if (opcode === JUMP_IF_NOT_ZERO) {
        const parameter1 = this.getValue(parameter1Mode, this.pc + 1);
        const parameter2 = this.getValue(parameter2Mode, this.pc + 2);

        this.pc = parameter1 !== 0 ? parameter2 : this.pc + 3;
      } else if (opcode === JUMP_IF_ZERO) {
        const parameter1 = this.getValue(parameter1Mode, this.pc + 1);
        const parameter2 = this.getValue(parameter2Mode, this.pc + 2);

        this.pc = parameter1 === 0 ? parameter2 : this.pc + 3;
      } else if (opcode === LESS_THAN) {
        const parameter1 = this.getValue(parameter1Mode, this.pc + 1);
        const parameter2 = this.getValue(parameter2Mode, this.pc + 2);
        const resultPointer = this.getAddress(parameter3Mode, this.pc + 3);

        this.memory[resultPointer] = parameter1 < parameter2 ? 1 : 0;

        this.pc += 4;
      } else if (opcode === EQUALS) {
        const parameter1 = this.getValue(parameter1Mode, this.pc + 1);
        const parameter2 = this.getValue(parameter2Mode, this.pc + 2);
        const resultPointer = this.getAddress(parameter3Mode, this.pc + 3);

        this.memory[resultPointer] = parameter1 === parameter2 ? 1 : 0;

        this.pc += 4;
      } else if (opcode === SET_RELATIVE_BASE) {
        const parameter1 = this.getValue(parameter1Mode, this.pc + 1);

        this.relativeBase += parameter1;

        this.pc += 2;
      } else if (opcode === HALT) {
        this.terminated = true;
      }
    }
  }
}

module.exports = IntCodeComputer;
