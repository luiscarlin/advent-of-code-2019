const getOreCount = (formulas, chemical, amountNeeded, extras = {}) => {
  const amountInExtras = extras[chemical] || 0;

  if (amountInExtras > 0) {
    if (amountInExtras >= amountNeeded) {
      extras[chemical] -= amountNeeded;
      return 0;
    } else {
      amountNeeded = amountNeeded - amountInExtras;
      extras[chemical] = 0;
    }
  }

  const amountProduced = formulas[chemical].amount;

  const multiplier = Math.ceil(amountNeeded / amountProduced);

  extras[chemical] = multiplier * amountProduced - amountNeeded;
  const recipe = formulas[chemical].recipe;

  return recipe
    .map(({ amount, element }) => {
      if (element == 'ORE') {
        return amount * multiplier;
      }
      return getOreCount(formulas, element, amount * multiplier, extras);
    })
    .reduce((acc, a) => acc + a);
};

const main = input => {
  const formulas = getFormulas(input);

  return getOreCount(formulas, 'FUEL', 1);
};

const getFormulas = lines => {
  return lines
    .map(line => line.split(/=>|,/))
    .reduce((acc, elementList) => {
      const [num, name] = elementList
        .pop()
        .trim()
        .split(' ');

      acc[name] = {
        amount: +num,
        recipe: [],
      };

      elementList.forEach(otherElement => {
        const [num1, name1] = otherElement.trim().split(' ');

        acc[name].recipe.push({
          amount: +num1,
          element: name1,
        });
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
