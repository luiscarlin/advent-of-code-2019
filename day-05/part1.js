const main = () => {
  return 'in main';
};

if (require.main === module) {
  console.log('part 1', main());
}

module.exports = () => main();
