export const clearReactiveForm = (obj: Record<string, unknown>): void => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      // If the value is an object, recursively clear it
      clearReactiveForm(value as Record<string, unknown>);
    } else {
      // Set the value to an empty string
      obj[key] = '';
    }
  });
};
