import { Signal } from "@preact/signals";
import { useCallback } from "preact/compat";
import "./numberInput.css";
import { SvgIconComponent } from "@/assets/SvgIcons";

export function NumberInput({
  icon: Icon,
  initialValue = 0,
  onChange,
  readOnly,
}: {
  icon: SvgIconComponent;
  initialValue?: Signal<number> | number;
  onChange?: (next: number) => void;
  readOnly?: boolean;
}) {
  const handleOnChange = useCallback<HTMLInputElement["onchange"]>((e) => {
    const target = e.target as HTMLInputElement;
    const targetValue = target.value || "0";
    onChange?.(parseInt(targetValue, 10));
  }, []);

  const muteOnEnterKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }, []);
  return (
    <>
      <label className="number-input__label">
        <Icon />
      </label>
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
