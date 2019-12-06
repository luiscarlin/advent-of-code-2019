const part1 = require('./part1');
const part2 = require('./part2');

describe('day06', () => {
  describe('part1', () => {
    it('finds the correct number of direct and indirect relationships', () => {
      const answer = part1([
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
      ]);

      expect(answer).toEqual(42);
    });
  });
  describe('part2', () => {
    it('finds the minimum number of steps from YOU to SAN', () => {
      const answer = part2([
        'COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
        'K)YOU',
        'I)SAN',
      ]);

      expect(answer).toEqual(4);
    });
  });
});
