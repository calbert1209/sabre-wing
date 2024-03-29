import { Signal, computed, signal } from "@preact/signals";
import { Clock } from "./clock";
import { limitToTestEnv } from "@/utils";

function stateAtTime(s: PacerStep[], t: number) {
  if (t < 0) {
    return null;
  }

  let tRemain = t;
  let vStart = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i].time >= tRemain) {
      return {
        index: i,
        volumeStart: vStart,
        volumeEnd: vStart + s[i].water,
        stepTime: tRemain,
        totalVolume: vStart + s[i].volumeAtTime(tRemain),
      };
    }

    tRemain -= s[i].time;
    vStart += s[i].water;
  }

  return null;
}

export const stateAtTime__testOnly = limitToTestEnv(stateAtTime);

export class PacerStep {
  constructor(public readonly time: number, public readonly water: number) {}

  volumeAtTime(t: number) {
    return (this.water / this.time) * t;
  }
}

export class Pacer {
  private readonly clock: Clock;
  public readonly totalTime: Signal<number>;
  public readonly stepTimeRemaining: Signal<number>;
  public readonly totalVolume: Signal<number>;
  public readonly volumeStart: Signal<number>;
  public readonly volumeEnd: Signal<number>;
  public readonly running: Signal<boolean>;

  private readonly targetVolume: number;
  private readonly targetTime: number;

  constructor(
    private readonly steps: PacerStep[],
    tickDuration: number = 1000
  ) {
    this.clock = new Clock(tickDuration);
    this.clock.addEventListener("tick", this.onTick.bind(this));
    this.totalTime = signal(0);
    this.stepTimeRemaining = signal(steps[0].time);
    this.totalVolume = signal(0);
    this.volumeStart = signal(0);
    this.volumeEnd = signal(steps[0].water);
    const [recipeT, recipeW] = steps.reduce(
      ([aggT, aggW], c) => [aggT + c.time, aggW + c.water],
      [0, 0]
    );
    this.targetTime = recipeT;
    this.targetVolume = recipeW;
    this.running = signal(false);
  }

  public start() {
    if (this.clock.running) return;

    if (this.totalVolume.value >= this.targetVolume) return;

    this.running.value = true;
    this.clock.start();
  }

  public stop() {
    this.running.value = false;
    this.clock.stop();
  }

  public togglePlay() {
    if (this.running.value) {
      this.stop();
    } else {
      this.start();
    }
  }

  public reset() {
    this.clock.reset();
    this.totalTime.value = 0;
    this.stepTimeRemaining.value = this.steps[0].time;
    this.totalVolume.value = 0;
    this.volumeStart.value = 0;
    this.volumeEnd.value = this.steps[0].water;
    this.running.value = false;
  }

  private onTick() {
    this.totalTime.value = this.clock.value;
    const { index, volumeStart, volumeEnd, stepTime, totalVolume } =
      stateAtTime(this.steps, this.clock.value);
    this.stepTimeRemaining.value = this.steps[index].time - stepTime;
    this.volumeStart.value = volumeStart;
    this.volumeEnd.value = volumeEnd;
    this.totalVolume.value = totalVolume;

    if (
      this.totalTime.value === this.targetTime ||
      this.totalVolume.value === this.targetVolume
    ) {
      this.stop();
    }
  }
}
