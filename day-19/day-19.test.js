const part1 = require('./part1');
const part2 = require('./part2');

describe('dayn', () => {
  describe('part 1', () => {
    it('outputs the correct value', () => {
      expect(part1('part1')).toEqual('part1');
    });
  });

  describe('part 2', () => {
    it('outputs the correct value', () => {
      expect(part2('part2')).toEqual('part2');
    });
  });
});
