import { SignalArray } from "@/hooks/useSignalArray";
import { Signal, signal, computed } from "@preact/signals";
import { useMemo } from "preact/hooks";

export type RecipeStep = { time: number; water: number };
export type StepChangeHandler = (
  stepIndex: number,
  name: keyof RecipeStep,
  value: number
) => void;

class RecipeState {
  public dose: Signal<number>;
  public steps: SignalArray<RecipeStep>;

  constructor(params: { dose: number; steps: RecipeStep[] }) {
    this.dose = signal(params.dose);
    this.steps = new SignalArray(params.steps);
  }

  get totalWaterVolume() {
    return computed(() =>
      this.steps.signal.value.reduce((agg, step) => agg + step.water, 0)
    );
  }

  public setDose(value: number) {
    this.dose.value = value;
  }

  public addStep(step: RecipeStep) {
    this.steps.push(step);
  }

  public deleteStep(index: number) {
    this.steps.splice(index, 1);
  }

  public updateStep(index: number, name: keyof RecipeStep, value: number) {
    const nextStep = { ...this.steps.signal.value[index], [name]: value };
    this.steps.splice(index, 1, nextStep);
  }
}

export function useRecipeState() {
  return useMemo(
    () =>
      new RecipeState({
        dose: 20,
        steps: [
          { time: 30, water: 60 },
          { time: 30, water: 90 },
          { time: 30, water: 100 },
          { time: 30, water: 100 },
        ],
      }),
    []
  );
}