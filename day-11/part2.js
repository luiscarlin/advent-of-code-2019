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

  panels[[position.x, position.y]] = 1;

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

  print(panels);
  return Object.keys(panels).length;
};

const print = panels => {
  const keys = Object.keys(panels).map(key => key.split(','));

  const xList = keys.map(coord => +coord[0]);
  const yList = keys.map(coord => +coord[1]);

  const maxX = Math.max(...xList);
  const minX = Math.min(...xList);
  const maxY = Math.max(...yList);
  const minY = Math.min(...yList);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const panelValue = panels[[x, y]] || '0';

      if (panelValue === '0') {
        process.stdout.write(' ');
      } else {
        process.stdout.write('#');
      }
    }
    console.log();
  }
};

if (require.main === module) {
  const input = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 2', main(input));
}

module.exports = main;
