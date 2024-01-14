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

  return (
    <div className="volume-display">
      <div className="volume-display-number volume-display-secondary">
        {start}
      </div>
      <div className="volume-display-number volume-display-primary">
        <div>{totalVolume}</div>
      </div>
      <div className="volume-display-number volume-display-secondary volume-display-end">
        {end}
      </div>
    </div>
  );
}
