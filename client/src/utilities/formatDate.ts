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

export const formatDateTime = (date: string | Date): string => {
  const now = dayjs();
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
