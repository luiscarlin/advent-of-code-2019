const part1 = require('./part1');

describe('day 10', () => {
  describe('part 1', () => {
    it('test1', () => {
      const input = '.#..#\n.....\n#####\n....#\n...##';

      const expectedOutput = {
        location: [3, 4],
        asteroids: 8,
      };

      expect(part1(input)).toEqual(expectedOutput);
    });

    it('test2', () => {
      const input =
        '......#.#.\n#..#.#....\n..#######.\n.#.#.###..\n.#..#.....\n..#....#.#\n#..#....#.\n.##.#..###\n##...#..#.\n.#....####';

      const expectedOutput = {
        location: [5, 8],
        asteroids: 33,
      };

      expect(part1(input)).toEqual(expectedOutput);
    });

    it('test3', () => {
      const input =
        '#.#...#.#.\n.###....#.\n.#....#...\n##.#.#.#.#\n....#.#.#.\n.##..###.#\n..#...##..\n..##....##\n......#...\n.####.###.';

      const expectedOutput = {
        location: [1, 2],
        asteroids: 35,
      };

      expect(part1(input)).toEqual(expectedOutput);
    });

    it('test4', () => {
      const input =
        '.#..#..###\n####.###.#\n....###.#.\n..###.##.#\n##.##.#.#.\n....###..#\n..#.#..#.#\n#..#.#.###\n.##...##.#\n.....#.#..';

      const expectedOutput = {
        location: [6, 3],
        asteroids: 41,
      };

      expect(part1(input)).toEqual(expectedOutput);
    });

    it('test5', () => {
      const input =
        '.#..##.###...#######\n##.############..##.\n.#.######.########.#\n.###.#######.####.#.\n#####.##.#.##.###.##\n..#####..#.#########\n####################\n#.####....###.#.#.##\n##.#################\n#####.##.###..####..\n..######..##.#######\n####.##.####...##..#\n.#####..#.######.###\n##...#.##########...\n#.##########.#######\n.####.#.###.###.#.##\n....##.##.###..#####\n.#.#.###########.###\n#.#.#.#####.####.###\n###.##.####.##.#..##';

      const expectedOutput = {
        location: [11, 13],
        asteroids: 210,
      };

      expect(part1(input)).toEqual(expectedOutput);
    });
  });
});
