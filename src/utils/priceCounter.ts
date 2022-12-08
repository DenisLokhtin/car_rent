export default (diff) => {
  const tariff = 1000;

  const list = [];
  for (let i = 1; i <= diff; i++) {
    list.push(i);
  }

  const interval1 = list.splice(0, 3);
  const interval2 = list.splice(4, 8);
  const interval3 = list.splice(9, 16);
  const interval4 = list.splice(17, 29);

  return (
    interval1.length * tariff +
    interval2.length * (tariff - (tariff / 100) * 5) +
    interval3.length * (tariff - (tariff / 100) * 10) +
    interval4.length * (tariff - (tariff / 100) * 15)
  );
};
