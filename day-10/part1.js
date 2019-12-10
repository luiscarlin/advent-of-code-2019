const main = () => {
  return 1;
};

if (require.main === module) {
  console.log('part 1', main());
}

module.exports = main;
