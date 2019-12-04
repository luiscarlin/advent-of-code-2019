const part1 = require('./part1');
const part2 = require('./part2');

describe('day-04', () => {
  describe('part1', () => {
    it('returns valid when all repeated digits', () => {
      expect(part1(111111, 111111)).toEqual(1);
    });

    it('returns invalid when decreasing digits', () => {
      expect(part1(223450, 223450)).toEqual(0);
    });

    it('returns invalid when no repeated digits', () => {
      expect(part1(123789, 123789)).toEqual(0);
    });
  });

  describe('part2', () => {
    it('returns invalid when all repeated digits', () => {
      expect(part2(111111, 111111)).toEqual(0);
    });

    it('returns invalid when decreasing digits', () => {
      expect(part2(223450, 223450)).toEqual(0);
    });

    it('returns invalid when no repeated digits', () => {
      expect(part2(123789, 123789)).toEqual(0);
    });

    it('returns valid when repeated digits are exactly two digits long', () => {
      expect(part2(112233, 112233)).toEqual(1);
    });

    it('returns invalid when repeated digits are part of bigger group', () => {
      expect(part2(123444, 123444)).toEqual(0);
    });

    it('returns valid when exactly repeated twice and different number repeated more than twice', () => {
      expect(part2(111122, 111122)).toEqual(1);
    });
  });
});
