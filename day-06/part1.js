const main = nodeList => {
  const nodes = {};

  nodeList.forEach(node => {
    const [center, orbiting] = node.split(')');

    nodes[orbiting] = center;
  });

  let direct = 0;
  let indirect = 0;

  for (let center of Object.values(nodes)) {
    direct += 1;

    while (center !== 'COM') {
      indirect += 1;
      center = nodes[center];
    }
  }

  return direct + indirect;
};

if (require.main === module) {
  const nodeList = require('fs')
    .readFileSync(`${__dirname}/input.txt`, 'utf8')
    .split('\n')
    .filter(n => n);
  console.log('part 1', main(nodeList));
}

module.exports = nodeList => {
  return main(nodeList);
};
