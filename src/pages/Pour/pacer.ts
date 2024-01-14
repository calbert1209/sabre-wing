import { Signal, signal } from "@preact/signals";
import { Clock } from "./clock";

export class PacerStep {
  constructor(public readonly time: number, public readonly water: number) {}

  get amountPerTick() {
    return this.water / this.time;
  }
}

export class Pacer {
  private readonly clock: Clock;
  public readonly totalTime: Signal<number>;
  public readonly stepCountdown: Signal<number>;
  public readonly stepIndex: Signal<number>;
  public readonly totalVolume: Signal<number>;
  public readonly volumeStart: Signal<number>;
  public readonly volumeEnd: Signal<number>;

  constructor(
    private readonly steps: PacerStep[],
    tickDuration: number = 1000
  ) {
    this.clock = new Clock(tickDuration);
    this.clock.addEventListener("tick", this.onTick.bind(this));
    this.totalTime = signal(0);
    this.stepCountdown = signal(steps[0].time);
    this.stepIndex = signal(0);
    this.totalVolume = signal(0);
    this.volumeStart = signal(0);
    this.volumeEnd = signal(steps[0].water);
  }

  public get currentStep(): PacerStep {
    return this.steps[this.stepIndex.value];
  }

  public start() {
    if (this.clock.running) return;

    console.log("Pacer: start");

    this.clock.start();
  }

  public stop() {
    console.log("Pacer: stop");

    this.clock.stop();
  }

  public reset() {
    console.log("Pacer: reset");
    this.clock.reset();
    this.totalTime.value = 0;
    this.stepCountdown.value = this.steps[0].time;
    this.stepIndex.value = 0;
    this.totalVolume.value = 0;
    this.volumeStart.value = 0;
    this.volumeEnd.value = this.steps[0].water;
  }

  private onTick() {
    this.totalTime.value += 1;
    if (
      this.stepCountdown.value === 0 &&
      this.stepIndex.value + 1 >= this.steps.length
    ) {
      console.log("Pacer: all done");
      this.stop();
      return;
    }

    this.totalVolume.value += this.currentStep.amountPerTick;

    if (this.stepCountdown.value === 0) {
      this.stepIndex.value += 1;
      const nextStart = this.steps.reduce((agg, step, i) => {
        if (i > this.stepIndex.value) {
          return agg;
        }

        return agg + step.water;
      }, 0);
      this.stepCountdown.value = this.currentStep.time;
      this.volumeStart.value = nextStart;
      this.volumeEnd.value = nextStart + this.currentStep.water;
      this.totalVolume.value = nextStart;
    } else {
      this.stepCountdown.value -= 1;
    }
  }
}
