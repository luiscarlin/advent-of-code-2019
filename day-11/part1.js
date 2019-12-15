/*
inputs:
- 0 => robot on black panel
- 1 => robot on white panel

outpus:
- 0 => paint the panel black
- 1 => paint the panel white
- 0 => turn left 90 degrees
- 1 => turn right 90 degrees


- after turn, move exacly 1 panel
- start facing up
- Do not restart the Intcode computer inside the robot during this process.
- start with all black panels

- black panels = .
- white panels = #
*/

const IntCode = require('./intcode');

const DEFAULT_PANEL_COLOR = 0;

const UP = { dx: 0, dy: 1 };
const LEFT = { dx: -1, dy: 0 };
const DOWN = { dx: 0, dy: -1 };
const RIGHT = { dx: 1, dy: 0 };

const main = instructions => {
  let panels = {};
  const intCode = new IntCode(instructions);

  const position = { x: 0, y: 0, direction: UP };

  while (true) {
    let currentPanelColor =
      panels[[position.x, position.y]] || DEFAULT_PANEL_COLOR;

    let color = intCode.execute(currentPanelColor);
    let turn = intCode.execute();

    if (intCode.terminated) {
      break;
    }

    if ((panels[[position.x, position.y]] || DEFAULT_PANEL_COLOR) !== color) {
      panels[[position.x, position.y]] = color;
    }

    const rotate = turn === 0 ? 'left' : 'right';

    if (position.direction === UP) {
      position.direction = rotate === 'left' ? LEFT : RIGHT;
    } else if (position.direction === LEFT) {
      position.direction = rotate === 'left' ? DOWN : UP;
    } else if (position.direction === DOWN) {
      position.direction = rotate === 'left' ? RIGHT : LEFT;
    } else if (position.direction === RIGHT) {
      position.direction = rotate === 'left' ? UP : DOWN;
    }

    position.x += position.direction.dx;
    position.y += position.direction.dy;
  }

  return Object.keys(panels).length;
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(input));
}

module.exports = main;
