const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const removeItems = (keys: string[]): void => {
  keys.map((key) => removeItem(key));
};

const asJSON = (data: string | null): unknown | null => {
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};

export { asJSON, setItem, removeItem, removeItems, getItem };
