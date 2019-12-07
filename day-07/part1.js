const main = () => {
  return 'hello';
};

if (require.main === module) {
  console.log('part 1', main());
}

module.exports = () => {
  return main();
};
