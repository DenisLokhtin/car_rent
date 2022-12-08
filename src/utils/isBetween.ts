import * as dayjs from 'dayjs';

export default (date1, date2, now, end) => {
  return (
    dayjs(date1).isBefore(now) &&
    dayjs(date1).isAfter(end) &&
    !(dayjs(date2).isBefore(now) && dayjs(date2).isAfter(end))
  );
};
