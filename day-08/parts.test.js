const part1 = require('./part1');

describe('day 08', () => {
  describe('part1 1', () => {
    it('returns number of 1s times 2s in the layer with fewest 0s', () => {
      expect(part1('122456789012', 3, 2)).toEqual(2);
    });
  });
});
