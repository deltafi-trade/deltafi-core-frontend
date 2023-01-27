import { useCallback, useEffect, useMemo, useState } from "react";
import { PublicKey } from "@solana/web3.js";

export const convertDollar = (value) => {
  return "USD " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function formatPubkey(key: PublicKey) {
  if (key) {
    const keyStr = key.toBase58();
    return keyStr.slice(0, 9) + "..." + keyStr.slice(-3);
  }
  return "";
}

export function fixedNumber(
  number: number | string | null | undefined,
  maxDecimalPlace: number = 6,
): string {
  if (number === null || number === undefined) {
    return "";
  }
  return Number(number).toFixed(maxDecimalPlace);
}

const localStorageListeners = {};

export function useLocalStorageStringState(
  key: string,
  defaultState: string | null = null,
): [string | null, (newState: string | null) => void] {
  const state = localStorage.getItem(key) || defaultState;

  const [, notify] = useState(key + "\n" + state);

  useEffect(() => {
    if (!localStorageListeners[key]) {
      localStorageListeners[key] = [];
    }
    localStorageListeners[key].push(notify);
    return () => {
      localStorageListeners[key] = localStorageListeners[key].filter(
        (listener) => listener !== notify,
      );
      if (localStorageListeners[key].length === 0) {
        delete localStorageListeners[key];
      }
    };
  }, [key]);

  const setState = useCallback<(newState: string | null) => void>(
    (newState) => {
      const changed = state !== newState;
      if (!changed) {
        return;
      }

      if (newState === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, newState);
      }
      localStorageListeners[key]?.forEach((listener) => listener(key + "\n" + newState));
    },
    [state, key],
  );

  return [state, setState];
}

export function useLocalStorageState<T = any>(
  key: string,
  defaultState: T | null = null,
): [T, (newState: T) => void] {
  let [stringState, setStringState] = useLocalStorageStringState(key, JSON.stringify(defaultState));
  return [
    useMemo(() => stringState && JSON.parse(stringState), [stringState]),
    (newState) => setStringState(JSON.stringify(newState)),
  ];
}

export function chunks<T>(array: T[], size: number): T[][] {
  return Array.apply<number, T[], T[][]>(0, new Array(Math.ceil(array.length / size))).map(
    (_, index) => array.slice(index * size, (index + 1) * size),
  );
}
