import { Signal } from "@preact/signals";
import { useCallback } from "preact/compat";
import "./numberInput.css";

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
  const handleOnChange = useCallback<HTMLInputElement["onchange"]>((e) => {
    const target = e.target as HTMLInputElement;
    onChange?.(parseInt(target.value, 10));
  }, []);

  const muteOnEnterKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }, []);
  return (
    <>
      <label className="number-input__label" children={label} />
      <input
        className="number-input__input"
        type="number"
        value={initialValue}
        onChange={handleOnChange}
        readOnly={readOnly}
        onKeyDown={muteOnEnterKey}
        onKeyUp={muteOnEnterKey}
      />
    </>
  );
}
