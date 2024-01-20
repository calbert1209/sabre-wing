import { PacerStep, stateAtTime__testOnly as stateAtTime } from "./pacer";
import { describe, test, expect } from "vitest";

describe(`${stateAtTime.name}`, () => {
  const steps: PacerStep[] = [60, 90, 100, 100].map(
    (w) => new PacerStep(30, w)
  );

  describe("should return correct values", () => {
    describe("when index is out of bounds", () => {
      [{ t: 121 }, { t: -1 }].forEach(({ t }) => {
        test(`${t}`, () => {
          const index = stateAtTime(steps, t);
          expect(index).toBeNull();
        });
      });
    });

    describe("when index is in bounds", () => {
      [
        {
          t: 0,
          expected: {
            index: 0,
            volumeStart: 0,
            volumeEnd: 60,
            stepTime: 0,
            totalVolume: 0,
          },
        },
        {
          t: 30,
          expected: {
            index: 0,
            volumeStart: 0,
            volumeEnd: 60,
            stepTime: 30,
            totalVolume: 60,
          },
        },
        {
          t: 31,
          expected: {
            index: 1,
            volumeStart: 60,
            volumeEnd: 150,
            stepTime: 1,
            totalVolume: 60 + 90 / 30,
          },
        },
        {
          t: 71,

          expected: {
            index: 2,
            volumeStart: 150,
            volumeEnd: 250,
            stepTime: 11,
            totalVolume: 150 + (100 / 30) * 11,
          },
        },
        {
          t: 91,
          expected: {
            index: 3,
            volumeStart: 250,
            volumeEnd: 350,
            stepTime: 1,
            totalVolume: 250 + 100 / 30,
          },
        },
        {
          t: 120,
          expected: {
            index: 3,
            volumeStart: 250,
            volumeEnd: 350,
            stepTime: 30,
            totalVolume: 350,
          },
        },
      ].forEach(({ t, expected }) => {
        test(`${t}`, () => {
          const index = stateAtTime(steps, t);
          expect(index).toMatchObject(expected);
        });
      });
    });
  });
});
