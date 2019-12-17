const main = input => {
  const formulas = getFormulas(input);

  console.log(formulas);
};

const getFormulas = lines => {
  return lines
    .map(line => line.split(/=>|,/))
    .reduce((acc, elementList) => {
      const [num, name] = elementList
        .pop()
        .trim()
        .split(' ');

      acc[[num, name]] = [];

      elementList.forEach(otherElement => {
        const [num1, name1] = otherElement.trim().split(' ');
        acc[[num, name]].push(`${num1},${name1}`);
      });

      return acc;
    }, []);
};

if (require.main === module) {
  const input = require('fs')
    .readFileSync(`${__dirname}/input.txt`, 'utf8')
    .split('\n');
  console.log('part 1', main(input));
}

module.exports = main;

// {
//   '8,PHBMP':  ['3,JQFM', '5,QMQB'],
//   '8,PHBMP':  ['3,JQFM', '5,QMQB'],
// }
