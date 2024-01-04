import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";

type SignalArray<T> = {
  signal: Signal<T[]>;
  splice: (start: number, deleteCount?: number, ...items: T[]) => void;
  push: (items: T) => void;
};

export function useSignalArray<T>(init: (() => T[]) | T[]): SignalArray<T> {
  const initialValues = typeof init === "function" ? init() : init;
  const array = useSignal<T[]>(initialValues);

  const splice = useCallback(
    (start: number, deleteCount?: number, ...items: T[]) => {
      const nextArray = [...array.value];
      nextArray.splice(start, deleteCount, ...items);
      array.value = nextArray;
    },
    []
  );

  const push = useCallback((item: T) => {
    const nextArray = [...array.value];
    nextArray.push(item);
    array.value = nextArray;
  }, []);

  return { signal: array, splice, push };
}
