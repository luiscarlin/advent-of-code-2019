class AmplifierController {
  constructor(instructions, input) {
    this.memory = instructions.split(',').map(Number);
    this.inputQueue = input ? [input] : [];
    this.output = -1;
    this.pc = 0;
    this.terminated = false;
    this.relativeBase = 0;
  }

  pushToInputQueue(input) {
    this.inputQueue.push(input);
  }

  accessMemoryWithMode(mode, address) {
    if (mode === 0) {
      let valueAtAddress = this.getValueAt(address);
      return this.getValueAt(valueAtAddress);
    } else if (mode === 1) {
      return this.getValueAt(address);
    } else if (mode === 2) {
      const valueAtAddress = this.getValueAt(address);
      return this.getValueAt(valueAtAddress + this.relativeBase);
    }
  }

  getValueAt = address => {
    return this.memory[address] || 0;
  };

  execute() {
    let parameter1, parameter2, resultPointer;

    while (!this.terminated) {
      const instruction = `${this.getValueAt(this.pc)}`.padStart(5, '0');
      const opcode = +instruction.slice(3);

      const [
        thirdParamMode,
        secondParamMode,
        firstParamMode,
        ..._
      ] = instruction.split('').map(Number);

      switch (opcode) {
        case 1:
          parameter1 = this.accessMemoryWithMode(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemoryWithMode(secondParamMode, this.pc + 2);
          resultPointer = this.getValueAt(this.pc + 3);

          this.memory[resultPointer] = parameter1 + parameter2;
          this.pc += 4;
          break;

        case 2:
          parameter1 = this.accessMemoryWithMode(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemoryWithMode(secondParamMode, this.pc + 2);
          resultPointer = this.getValueAt(this.pc + 3);

          this.memory[resultPointer] = parameter1 * parameter2;
          this.pc += 4;
          break;

        case 3:
          resultPointer = this.getValueAt(this.pc + 1);

          this.memory[resultPointer] = this.inputQueue.shift();

          this.pc += 2;
          break;

        case 4:
          this.output = this.accessMemoryWithMode(firstParamMode, this.pc + 1);
          this.pc += 2;
          return this.output;

        case 5:
          parameter1 = this.accessMemoryWithMode(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemoryWithMode(secondParamMode, this.pc + 2);

          this.pc = parameter1 !== 0 ? parameter2 : this.pc + 3;
          break;

        case 6:
          parameter1 = this.accessMemoryWithMode(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemoryWithMode(secondParamMode, this.pc + 2);

          this.pc = parameter1 === 0 ? parameter2 : this.pc + 3;
          break;

        case 7:
          parameter1 = this.accessMemoryWithMode(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemoryWithMode(secondParamMode, this.pc + 2);
          resultPointer = this.getValueAt(this.pc + 3);

          this.memory[resultPointer] = parameter1 < parameter2 ? 1 : 0;
          this.pc += 4;
          break;

        case 8:
          parameter1 = this.accessMemoryWithMode(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemoryWithMode(secondParamMode, this.pc + 2);
          resultPointer = this.getValueAt(this.pc + 3);

          this.memory[resultPointer] = parameter1 === parameter2 ? 1 : 0;
          this.pc += 4;
          break;

        case 9:
          parameter1 = this.accessMemoryWithMode(firstParamMode, this.pc + 1);

          this.relativeBase += parameter1;
          this.pc += 2;
          break;
        case 99:
          this.terminated = true;
          break;
      }
    }
  }
}

module.exports = AmplifierController;
