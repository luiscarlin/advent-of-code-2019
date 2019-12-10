const part1 = require('./part1');

describe('day 09', () => {
  describe('part 1', () => {
    it('returns correct value', () => {
      expect(
        part1('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99')
      ).toEqual('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99');
    });

    it('returns correct value2', () => {
      expect(part1('1102,34915192,34915192,7,4,7,99,0')).toEqual(
        '1219070632396864'
      );
    });

    it('returns correct value3', () => {
      expect(part1('104,1125899906842624,99')).toEqual('1125899906842624');
    });
  });
});
