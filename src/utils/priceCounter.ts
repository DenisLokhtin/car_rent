export default (days, discounts, tariff) => {
  let rentalPrice = 0;

  for (let i = 1; i <= days; i++) {
    let price = tariff;

    for (const discount of discounts) {
      if (i >= discount.start && i <= discount.end) {
        const discountAmount = price * (discount.percentage / 100);
        price -= discountAmount;
        break;
      }
    }

    rentalPrice += price;
  }

  return Math.round(rentalPrice);
};
