import { NumberInput } from "@/components/NumberInput";
import { useSignalArray } from "@/hooks/useSignalArray";
import { Signal, useComputed, useSignal } from "@preact/signals";
import { useCallback, useMemo } from "preact/hooks";

function StepSettings({
  stepIndex,
  time,
  water,
  onChange,
  onDelete,
}: {
  stepIndex: number;
  time: Signal<number> | number;
  water: Signal<number> | number;
  onChange: (stepIndex: number, name: "time" | "water", value: number) => void;
  onDelete: (stepIndex: number) => void;
}) {
  const handleOnChange = (name: "time" | "water", nextValue: number) => {
    onChange(stepIndex, name, nextValue);
  };

  const handleOnDelete = useCallback<HTMLButtonElement["onclick"]>(
    (e) => {
      e.preventDefault();
      onDelete(stepIndex);
    },
    [stepIndex]
  );

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
      <button onClick={handleOnDelete}>-</button>
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
  const {
    signal: steps,
    splice,
    push,
  } = useSignalArray([
    { time: 30, water: 60 },
    { time: 30, water: 90 },
    { time: 30, water: 100 },
    { time: 30, water: 100 },
  ]);
  const totalWaterVolume = useComputed(() => {
    return steps.value?.reduce((agg, step) => agg + step.water, 0);
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

  const handleOnDeleteStep = useCallback((index: number) => {
    splice(index, 1);
  }, []);

  const handleOnAddStep = useCallback<HTMLButtonElement["onclick"]>((e) => {
    e.preventDefault();
    push({ time: 30, water: 50 });
  }, []);

  return (
    <section>
      <form>
        <Summary
          totalWaterVolume={totalWaterVolume.value}
          dose={dose}
          onChangeDose={onChangeDose}
        />
        <button onClick={handleOnAddStep}>step +</button>
        {steps.value.map(({ time, water }, index) => (
          <StepSettings
            key={`item-${index}`}
            stepIndex={index}
            water={water}
            time={time}
            onChange={handleOnChangeStep}
            onDelete={handleOnDeleteStep}
          />
        ))}
      </form>
    </section>
  );
}
