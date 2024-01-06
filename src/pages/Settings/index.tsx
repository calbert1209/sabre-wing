import { NumberInput } from "@/components/NumberInput";
import { useSignalArray } from "@/hooks/useSignalArray";
import { Signal, useComputed, useSignal } from "@preact/signals";

function StepSettings({
  time,
  water,
  onChange,
  stepIndex,
}: {
  stepIndex: number;
  onChange: (stepIndex: number, name: "time" | "water", value: number) => void;
  time: Signal<number> | number;
  water: Signal<number> | number;
}) {
  const handleOnChange = (name: "time" | "water", nextValue: number) => {
    onChange(stepIndex, name, nextValue);
  };

  return (
    <fieldset>
      <NumberInput
        label="t"
        initialValue={time}
        onChange={(value) => handleOnChange("time", value)}
        readOnly
      />
      <NumberInput
        label="w"
        initialValue={water}
        onChange={(value) => handleOnChange("water", value)}
      />
    </fieldset>
  );
}

function Summary({
  totalWaterVolume,
  dose,
  onChangeDose,
}: {
  totalWaterVolume: Signal<number> | number;
  dose: Signal<number>;
  onChangeDose: (dose: number) => void;
}) {
  return (
    <fieldset>
      <NumberInput label="d" initialValue={dose} onChange={onChangeDose} />
      <NumberInput label="total w" initialValue={totalWaterVolume} readOnly />
    </fieldset>
  );
}

export function Settings() {
  const dose = useSignal(20);
  const { signal: steps, splice } = useSignalArray([
    { time: 30, water: 60 },
    { time: 30, water: 90 },
    { time: 30, water: 100 },
    { time: 30, water: 100 },
  ]);
  const totalWaterVolume = useComputed(() => {
    const nextTotal =
      steps.value?.reduce((agg, step) => agg + step.water, 0) ?? 0;
    console.log(steps.value);
    return nextTotal;
  });

  const onChangeDose = (nextDose: number) => (dose.value = nextDose);
  const handleOnChangeStep = (
    stepIndex: number,
    name: "time" | "water",
    value: number
  ) => {
    const nextStep = { ...steps.value[stepIndex], [name]: value };
    splice(stepIndex, 1, nextStep);
  };

  return (
    <section>
      <form>
        <Summary
          totalWaterVolume={totalWaterVolume.value}
          dose={dose}
          onChangeDose={onChangeDose}
        />
        {steps.value.map(({ time, water }, index) => (
          <StepSettings
            key={`item-${index}`}
            stepIndex={index}
            water={water}
            time={time}
            onChange={handleOnChangeStep}
          />
        ))}
      </form>
    </section>
  );
}
