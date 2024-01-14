export class Clock extends EventTarget {
  private _value: number;
  private interval: number;
  private tick: number;
  private _running: boolean;

  constructor(tick: number = 1000) {
    super();
    this._value = 0;
    this._running = false;
    this.interval = -1;
    this.tick = tick;
  }

  public get running() {
    return this._running;
  }

  public get value() {
    return this._value;
  }

  public start() {
    const self = this;
    self._running = true;
    self.interval = window.setInterval(() => {
      if (!self.running) {
        window.clearInterval(self.interval);
        return;
      }

      const event = new CustomEvent("tick", { detail: self._value });
      self._value += 1;
      self.dispatchEvent(event);
    }, self.tick);
  }

  public stop() {
    clearInterval(this.interval);
    this._running = false;
  }

  public reset() {
    this.stop();
    this._value = 0;
  }
}
