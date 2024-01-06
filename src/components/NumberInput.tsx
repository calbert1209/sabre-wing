import { Signal } from "@preact/signals";
import { ComponentProps } from "preact";
import { ChangeEvent } from "preact/compat";

export function NumberInput({
  label,
  initialValue = 0,
  onChange,
  readOnly,
}: {
  label: string;
  initialValue?: Signal<number> | number;
  onChange?: (next: number) => void;
  readOnly?: boolean;
}) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    onChange?.(parseInt(target.value, 10));
  };
  return (
    <>
      <label children={label} />
      <input
        type="number"
        value={initialValue}
        onChange={handleOnChange}
        readOnly={readOnly}
      />
    </>
  );
}
