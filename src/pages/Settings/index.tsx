import { NumberInput } from "@/components/NumberInput";

function StepSettings({ stepIndex }: { stepIndex: number }) {
  return (
    <fieldset>
      <NumberInput name="stepTime" label="t" initialValue={30} readOnly />
      <NumberInput name="stepWater" label="w" />
    </fieldset>
  );
}

function Summary() {
  return (
    <fieldset>
      <NumberInput name="doseInput" label="d" />
      <NumberInput
        name="totalWaterInput"
        label="total w"
        initialValue={250}
        readOnly
      />
    </fieldset>
  );
}

export function Settings() {
  return (
    <section>
      <form>
        <Summary />
        {[0, 1, 2, 3, 4].map((n) => (
          <StepSettings key={`item-${n}`} stepIndex={n} />
        ))}
      </form>
    </section>
  );
}
