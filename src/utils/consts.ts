import * as dayjs from 'dayjs';

export const now = dayjs();
export const end = dayjs().subtract(30, 'day');

export const saturday = 6;
export const sunday = 0;

export const maxRentDay = 30;
export const minRentDay = 1;
export const minRentBreak = 3;

export const counts = {};
