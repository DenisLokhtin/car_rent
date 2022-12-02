import * as dayjs from 'dayjs';

export default (rawDate) => {
  const date = dayjs(rawDate);
  return date.day();
};
