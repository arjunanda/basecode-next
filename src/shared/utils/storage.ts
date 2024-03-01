export const setSessionStorage = (key: string, value: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);

  }
};

export const getSessionStorage = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }

  return null;
};

export const removeSessionStorage = (key: string): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const removeAllSessionStorage = (): void => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
