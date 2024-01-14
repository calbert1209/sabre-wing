import "./timeDisplay.css";

export function TimeDisplay({
  sec,
  running,
}: {
  sec: number;
  running?: boolean;
}) {
  const m = Math.floor(sec / 60);
  const s = (sec % 60).toString(10).padStart(2, "0");

  return (
    <div className="time-display" data-running={!!running}>
      <div className="time-display-digits time-display-minutes">
        <div>{m}</div>
      </div>
      <div className="time-display-colon">{":"}</div>
      <div className="time-display-digits time-display-seconds">
        <div>{s}</div>
      </div>
    </div>
  );
}
