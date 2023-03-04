import React, { useCallback, useRef } from "react";

export const useDebounce = (func: (...args: any[]) => any, timeout = 500) => {
  const timer = useRef<any>(null);

  return useCallback(
    (...args: unknown[]) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => func.apply(this, args), timeout);
    },
    [func, timeout]
  );
};
