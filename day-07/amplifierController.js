class AmplifierController {
  constructor(instructions, input) {
    this.memory = instructions.split(',').map(Number);
    this.inputQueue = input ? [input] : [];
    this.output = -1;
    this.pc = 0;
    this.terminated = false;
  }

  pushToInputQueue(input) {
    this.inputQueue.push(input);
  }

  accessMemory(mode, pointer) {
    const valueAtPointer = this.memory[pointer];
    return mode === 0 ? this.memory[valueAtPointer] : valueAtPointer;
  }

  execute() {
    let parameter1, parameter2, resultPointer;

    while (!this.terminated) {
      const instruction = `${this.memory[this.pc]}`.padStart(5, '0');
      const opcode = +instruction.slice(3);

      const [
        thirdParamMode,
        secondParamMode,
        firstParamMode,
        ..._
      ] = instruction.split('').map(Number);

      switch (opcode) {
        case 1:
          parameter1 = this.accessMemory(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemory(secondParamMode, this.pc + 2);
          resultPointer = this.memory[this.pc + 3];

          this.memory[resultPointer] = parameter1 + parameter2;
          this.pc += 4;
          break;

        case 2:
          parameter1 = this.accessMemory(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemory(secondParamMode, this.pc + 2);
          resultPointer = this.memory[this.pc + 3];

          this.memory[resultPointer] = parameter1 * parameter2;
          this.pc += 4;
          break;

        case 3:
          resultPointer = this.memory[this.pc + 1];

          this.memory[resultPointer] = this.inputQueue.shift();

          this.pc += 2;
          break;

        case 4:
          this.output = this.accessMemory(firstParamMode, this.pc + 1);
          this.pc += 2;
          return this.output;

        case 5:
          parameter1 = this.accessMemory(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemory(secondParamMode, this.pc + 2);

          this.pc = parameter1 !== 0 ? parameter2 : this.pc + 3;
          break;

        case 6:
          parameter1 = this.accessMemory(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemory(secondParamMode, this.pc + 2);

          this.pc = parameter1 === 0 ? parameter2 : this.pc + 3;
          break;

        case 7:
          parameter1 = this.accessMemory(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemory(secondParamMode, this.pc + 2);
          resultPointer = this.memory[this.pc + 3];

          this.memory[resultPointer] = parameter1 < parameter2 ? 1 : 0;
          this.pc += 4;
          break;

        case 8:
          parameter1 = this.accessMemory(firstParamMode, this.pc + 1);
          parameter2 = this.accessMemory(secondParamMode, this.pc + 2);
          resultPointer = this.memory[this.pc + 3];

          this.memory[resultPointer] = parameter1 === parameter2 ? 1 : 0;
          this.pc += 4;
          break;
        case 99:
          this.terminated = true;
          break;
      }
    }
  }
}

module.exports = AmplifierController;
