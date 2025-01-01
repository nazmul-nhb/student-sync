/**
 * Utility function to check if the first letter of a string is capital.
 * @param string String to check.
 * @returns Boolean.
 */
export const isFirstLetterCapital = (string: string): boolean => {
    return	/^[A-Z]/.test(string);
}
