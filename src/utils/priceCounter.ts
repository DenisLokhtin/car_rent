export default (diff) => {
  const tariff = 1000;

  const list = [];
  for (let i = 1; i <= diff; i++) {
    list.push(i);
  }

  const one = list.splice(0, 3);
  const two = list.splice(4, 8);
  const three = list.splice(9, 16);
  const four = list.splice(17, 29);

  return (
    one.length * tariff +
    two.length * (tariff - (tariff / 100) * 5) +
    three.length * (tariff - (tariff / 100) * 10) +
    four.length * (tariff - (tariff / 100) * 15)
  );
};
