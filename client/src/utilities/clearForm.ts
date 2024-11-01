export const clearReactiveForm = (obj: Record<string, any>): void => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clearReactiveForm(obj[key]);
    } else {
      obj[key] = '';
    }
  });
};
