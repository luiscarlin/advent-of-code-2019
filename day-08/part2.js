const main = (image, width = 25, height = 6) => {
  const imageArr = image.split('');

  let i = 0;

  let layers = [];
  let finalImage = [];

  while (true) {
    const start = i * width * height;
    const end = (i + 1) * width * height;

    const layer = imageArr.slice(start, end);

    if (layer.length == 0) {
      break;
    }

    layers.push(layer);

    i++;
  }

  for (let i = 0; i < width * height; i += 1) {
    const layeredCell = layers.map(layer => layer[i]);

    let cellValue = 0;

    for (let cell of layeredCell) {
      if (cell !== '2') {
        cellValue = cell;
        break;
      }
    }
    finalImage.push(cellValue);
  }

  for (let cellIndex = 0; cellIndex < finalImage.length; cellIndex++) {
    const char = finalImage[cellIndex];
    if (char === '0') {
      process.stdout.write(' ');
    } else {
      process.stdout.write('#');
    }

    if ((cellIndex + 1) % width === 0) {
      process.stdout.write('\n');
    }
  }
};

if (require.main === module) {
  const image = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 2', main(image, 25, 6));
}

module.exports = main;
