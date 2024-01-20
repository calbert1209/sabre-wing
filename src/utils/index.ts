export function limitToTestEnv(
  fn: (...args: any[]) => any
): (...args: any[]) => any {
  return function (...args: any[]): any {
    if (import.meta.env.NODE_ENV === "test") {
      return fn(...args);
    }

    throw Error(`${fn.name}__testOnly for testing purposes only`);
  };
}
