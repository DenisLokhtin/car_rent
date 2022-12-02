import * as dayjs from 'dayjs';

export default (rawDate1, rawDate2) => {
  const date1 = dayjs(rawDate1);
  const date2 = dayjs(rawDate2);
  console.log(date1, date2);
  return date2.diff(date1, 'day');
};
