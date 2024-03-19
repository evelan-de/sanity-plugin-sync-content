export const ls = (key: string, value?: string): string | null => {
  if (value) {
    localStorage.setItem(key, value);
    return null;
  }
  const item = localStorage.getItem(key);
  return item === 'null' ? null : item;
};

export const getAllLocalStorage = () => {
  const items = { ...localStorage };

  return items;
};
