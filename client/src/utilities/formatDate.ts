import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);

export const formatDateOnly = (date: string | Date): string => {
  return dayjs(date).format('ddd, MMM DD, YYYY');
};

export const formatTimeOnly = (date: string | Date): string => {
  return dayjs(date).format('hh:mm:ssa');
};

export const getTimeStamp = (date: string | Date): number => {
  return dayjs(date).unix();
};

const now = dayjs();

export const formatDateTime = (date: string | Date): string => {
  const inputDate = dayjs(date);

  const minutesDiff = now.diff(inputDate, 'minutes');

  // Show recent times (a few seconds/minutes ago, like "45 minutes ago")
  if (minutesDiff < 60) {
    return inputDate.fromNow();
  }

  // If the date is today, return as "Today 12:50:20 am/pm"
  if (inputDate.isToday()) {
    return `Today ${inputDate.format('hh:mm:ss a')}`;
  }

  // If the date is yesterday, return as "Yesterday 12:50:20 am/pm"
  if (inputDate.isYesterday()) {
    return `Yesterday ${inputDate.format('hh:mm:ss a')}`;
  }

  // For any date before yesterday, return as "Sat, Oct 23, 2024 12:50:20 am/pm"
  return inputDate.format('ddd, MMM DD, YYYY hh:mm:ss a');
};

// Calculate current age
export const getCurrentAge = (date: string | Date): string => {
  const inputDate = dayjs(date);

  const yearDiff = now.diff(inputDate, 'year');
  const monthDiff = now.diff(inputDate.add(yearDiff, 'year'), 'month');
  const dayDiff = now.diff(
    inputDate.add(yearDiff, 'year').add(monthDiff, 'month'),
    'day',
  );

  const ageParts = [];

  if (yearDiff > 1) ageParts.push(`${yearDiff} years`);
  else if (yearDiff === 1) ageParts.push('1 year');

  if (monthDiff > 1) ageParts.push(`${monthDiff} months`);
  else if (monthDiff === 1) ageParts.push('1 month');

  if (dayDiff > 1) ageParts.push(`${dayDiff} days`);
  else if (dayDiff === 1) ageParts.push('1 day');

  return ageParts.join(' ');
};
