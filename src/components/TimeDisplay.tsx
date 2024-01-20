import "./timeDisplay.css";

function TotalTimeDisplay({
  sec,
  running,
  size,
}: {
  sec: number;
  running?: boolean;
  size?: "primary" | "secondary";
}) {
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toString(10).padStart(2, "0");

  return (
    <div
      className="total-time-display"
      data-running={!!running}
      data-size={size ?? "secondary"}
    >
      <div className="total-time-display-digits total-time-display-minutes">
        <div>{m}</div>
      </div>
      <div className="total-time-display-colon">{":"}</div>
      <div className="total-time-display-digits time-display-seconds">
        <div>{s}</div>
      </div>
    </div>
  );
}

export function TimeDisplay({
  sec,
  stepTime,
  running,
}: {
  sec: number;
  stepTime: number;
  running?: boolean;
}) {
  return (
    <div className="time-display">
      <TotalTimeDisplay sec={sec} running={running} size="primary" />
      <TotalTimeDisplay sec={stepTime} running={running} size="secondary" />
    </div>
  );
}
