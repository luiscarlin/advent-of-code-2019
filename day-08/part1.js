const main = (image, width = 25, height = 6) => {
  const imageArr = image.split('');

  let i = 0;

  let layerWithMinZeros = {
    zeros: 100000,
    ones: 0,
    twos: 0,
  };

  while (true) {
    const start = i * width * height;
    const end = (i + 1) * width * height;

    const layer = imageArr.slice(start, end);

    if (layer.length == 0) {
      break;
    }

    const layerObj = {
      zeros: layer.filter(char => char === '0').length,
      ones: layer.filter(char => char === '1').length,
      twos: layer.filter(char => char === '2').length,
    };

    if (layerObj.zeros < layerWithMinZeros.zeros) {
      layerWithMinZeros = { ...layerObj };
    }

    i++;
  }

  return layerWithMinZeros.ones * layerWithMinZeros.twos;
};

if (require.main === module) {
  const image = require('fs').readFileSync(`${__dirname}/input.txt`, 'utf8');
  console.log('part 1', main(image));
}

module.exports = main;
