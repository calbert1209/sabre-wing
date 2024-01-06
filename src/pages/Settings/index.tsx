import { NumberInput } from "@/components/NumberInput";
import { useRecipeStateContext } from "@/providers/RecipeStateProvider";
import { RecipeStep, StepChangeHandler } from "@/stores/RecipeState";
import { Signal } from "@preact/signals";
import { ComponentProps } from "preact";
import { useCallback } from "preact/hooks";

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
  onChange: StepChangeHandler;
  onDelete: (stepIndex: number) => void;
}) {
  const handleOnChange = (name: keyof RecipeStep, nextValue: number) => {
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
  const state = useRecipeStateContext();

  const handleOnAddStep = useCallback<HTMLButtonElement["onclick"]>((e) => {
    e.preventDefault();
    state.addStep({ time: 30, water: 50 });
  }, []);

  const handleOnChange = useCallback<
    ComponentProps<typeof StepSettings>["onChange"]
  >((...args) => state.updateStep(...args), []);
  const handleOnDelete = useCallback(
    (index: number) => state.deleteStep(index),
    []
  );

  return (
    <section>
      <form>
        <Summary
          totalWaterVolume={state.totalWaterVolume.value}
          dose={state.dose}
          onChangeDose={(d) => state.setDose(d)}
        />
        <button onClick={handleOnAddStep}>step +</button>
        {state.steps.signal.value.map(({ time, water }, index) => (
          <StepSettings
            key={`item-${index}`}
            stepIndex={index}
            water={water}
            time={time}
            onChange={handleOnChange}
            onDelete={handleOnDelete}
          />
        ))}
      </form>
    </section>
  );
}
