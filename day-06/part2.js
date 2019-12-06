const nx = require('jsnetworkx');

const main = nodeList => {
  const G = new nx.Graph();

  nodeList.forEach(node => {
    const [center, orbiting] = node.split(')');

    G.addEdge(center, orbiting);
  });

  const shortestPath = nx.shortestPathLength(G, {
    source: 'YOU',
    target: 'SAN',
  });

  return shortestPath - 2;
};

if (require.main === module) {
  const nodeList = require('fs')
    .readFileSync(`${__dirname}/input.txt`, 'utf8')
    .split('\n')
    .filter(n => n);
  console.log('part 2', main(nodeList));
}

module.exports = nodeList => {
  return main(nodeList);
};
