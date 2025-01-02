import dayjs from 'dayjs';

/**
 * Utility function to check if the first letter of a string is capital.
 * @param string String to check.
 * @returns Boolean.
 */
export const isFirstLetterCapital = (string: string): boolean => {
	return /^[A-Z]/.test(string);
};

/**
 * Utility function to check if a date is more than 14 years old.
 * @param date Date string or Date object to check.
 * @returns Boolean.
 */
export const isMoreThan14 = (date: string | Date): boolean => {
	const age = dayjs().diff(dayjs(date), 'year');
	return age >= 14;
};
