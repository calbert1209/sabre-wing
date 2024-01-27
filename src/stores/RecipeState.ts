import { SignalArray } from "@/hooks/useSignalArray";
import { Signal, signal, computed } from "@preact/signals";

export type RecipeStep = { time: number; water: number };
export type StepChangeHandler = (
  stepIndex: number,
  name: keyof RecipeStep,
  value: number
) => void;

type RecipeStateParameters = { dose: number; steps: RecipeStep[] };

export class RecipeState {
  public dose: Signal<number>;
  public steps: SignalArray<RecipeStep>;
  private readonly initialState: RecipeStateParameters;
  public linked: Signal<boolean>;

  constructor(params: RecipeStateParameters) {
    this.dose = signal(params.dose);
    this.steps = new SignalArray(params.steps);
    this.initialState = params;
    this.linked = signal(false);
  }

  get totalWaterVolume() {
    return computed(() =>
      this.steps.signal.value.reduce((agg, step) => agg + step.water, 0)
    );
  }

  public reset() {
    const { dose, steps } = this.initialState;
    this.dose.value = dose;
    const stepCount = this.steps.signal.value.length;
    this.steps.splice(0, stepCount, ...steps);
  }

  private scaleVolume(nextDose: number) {
    if (nextDose <= 0) return;

    const multiplier = nextDose / this.dose.value;
    this.steps.map(({ time, water }) => ({
      time,
      water: Math.round(multiplier * water),
    }));
  }

  public setDose(value: number) {
    if (this.linked.value) {
      this.scaleVolume(value);
    }

    this.dose.value = value;
  }

  public toggleLinked() {
    this.linked.value = !this.linked.value;
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
