import { useEffect, useState } from "react";

const persistValue = (key: string, value: unknown) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

const getValue = <T>(key: string, defaultValue: T): T => {
  const value = localStorage.getItem(key);

  if(!value) {
    return defaultValue;
  }

  return JSON.parse(value);
}

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(getValue<T>(key, defaultValue));

  useEffect(() => {
    persistValue(key, value);
  }, [key, value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
};
