import { NumberInput } from "@/components/NumberInput";
import { useAppState } from "@/providers/AppStateProvider";
import { useRecipeStateContext } from "@/providers/RecipeStateProvider";
import { RecipeStep, StepChangeHandler } from "@/stores/RecipeState";
import { Signal } from "@preact/signals";
import { ComponentProps } from "preact";
import { useCallback } from "preact/hooks";
import "./settings.css";

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
    <fieldset className="settings__fieldset">
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
      <button className="settings__delete-button" onClick={handleOnDelete}>
        -
      </button>
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
    <fieldset className="settings__fieldset">
      <NumberInput label="d" initialValue={dose} onChange={onChangeDose} />
      <NumberInput label="total w" initialValue={totalWaterVolume} readOnly />
    </fieldset>
  );
}

export function Settings() {
  const recipe = useRecipeStateContext();
  const appState = useAppState();

  const handleOnAddStep = useCallback<HTMLButtonElement["onclick"]>((e) => {
    e.preventDefault();
    recipe.addStep({ time: 30, water: 50 });
  }, []);

  const handleOnChange = useCallback<
    ComponentProps<typeof StepSettings>["onChange"]
  >((...args) => recipe.updateStep(...args), []);
  const handleOnDelete = useCallback(
    (index: number) => recipe.deleteStep(index),
    []
  );

  const handleOnClickOkay = useCallback<HTMLButtonElement["onclick"]>((e) => {
    e.preventDefault();
    appState.setMode("pour");
  }, []);

  return (
    <section>
      <form>
        <div className="settings__right-align">
          <button
            className="settings__action-button"
            onClick={handleOnClickOkay}
          >
            Okay
          </button>
        </div>
        <Summary
          totalWaterVolume={recipe.totalWaterVolume.value}
          dose={recipe.dose}
          onChangeDose={(d) => recipe.setDose(d)}
        />
        <div className="settings__right-align">
          <button className="settings__action-button" onClick={handleOnAddStep}>
            step +
          </button>
        </div>
        <div className="settings__step-list">
          {recipe.steps.signal.value.map(({ time, water }, index) => (
            <StepSettings
              key={`item-${index}`}
              stepIndex={index}
              water={water}
              time={time}
              onChange={handleOnChange}
              onDelete={handleOnDelete}
            />
          ))}
        </div>
      </form>
    </section>
  );
}
