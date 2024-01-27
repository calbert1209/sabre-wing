import { Signal, signal } from "@preact/signals";
import { useMemo } from "preact/hooks";

export class SignalArray<T> {
  public signal: Signal<T[]>;

  constructor(initial: T[]) {
    this.signal = signal(initial);
  }

  public splice(start: number, deleteCount?: number, ...items: T[]) {
    const nextArray = [...this.signal.value];
    nextArray.splice(start, deleteCount, ...items);
    this.signal.value = nextArray;
  }

  public push(item: T) {
    const nextArray = [...this.signal.value];
    nextArray.push(item);
    this.signal.value = nextArray;
  }

  public map(callback: (item: T, index: number, array: T[]) => T) {
    const nextArray = [...this.signal.value].map(callback);
    this.signal.value = nextArray;
  }
}

export function useSignalArray<T>(init: (() => T[]) | T[]): SignalArray<T> {
  const initialValues = typeof init === "function" ? init() : init;
  return useMemo(() => new SignalArray(initialValues), []);
}
