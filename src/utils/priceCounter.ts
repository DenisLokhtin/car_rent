export default (diff) => {
  const tariff = 1000;
  const list = [];

  for (let i = 1; i <= diff; i++) {
    list.push(i);
  }

  const getInterval = (num1, num2) => list.splice(num1, num2).length;
  const getPrice = (interval1, interval2, percent) =>
    getInterval(interval1, interval2) * (tariff - (tariff / 100) * percent);

  return (
    getPrice(0, 3, 0) +
    getPrice(4, 8, 5) +
    getPrice(9, 16, 10) +
    getPrice(17, 29, 15)
  );
};
