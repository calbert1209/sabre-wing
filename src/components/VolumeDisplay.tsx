import { useMemo } from "preact/hooks";
import "./volumeDisplay.css";

export function VolumeDisplay(props: {
  totalVolume: number;
  start: number;
  end: number;
}) {
  const [totalVolume, start, end] = [
    Math.round(props.totalVolume),
    Math.floor(props.start),
    Math.ceil(props.end),
  ];

  const percent = useMemo(() => {
    const dVol = props.totalVolume - props.start;
    if (dVol <= 0) return 0;

    return (dVol / (props.end - props.start)) * 100;
  }, [props.totalVolume, props.start, props.end]);

  return (
    <>
      <div className="volume-display">
        <div className="volume-display-number volume-display-primary">
          <div>{totalVolume}</div>
        </div>
        <div className="volume-display-number volume-display-secondary volume-display-end">
          {end}
        </div>
      </div>
      <div className="volume-display__ramp-row">
        <div className="volume-display__ramp-container">
          <div
            className="volume-display__progress-indicator"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </>
  );
}
