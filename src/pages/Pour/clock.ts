export class Clock extends EventTarget {
  private value: number;
  private running: boolean;
  private interval: number;
  private tick: number;

  constructor(tick: number = 1000) {
    super();
    this.value = 0;
    this.running = false;
    this.interval = -1;
    this.tick = tick;
  }

  public start() {
    const self = this;
    self.running = true;
    self.interval = window.setInterval(() => {
      if (!self.running) {
        window.clearInterval(self.interval);
        return;
      }

      const event = new CustomEvent("tick", { detail: self.value });
      self.value += 1;
      self.dispatchEvent(event);
    }, self.tick);
  }

  public stop() {
    clearInterval(this.interval);
    this.running = false;
  }

  public reset() {
    this.stop();
    this.value = 0;
  }
}
