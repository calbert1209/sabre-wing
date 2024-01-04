export function NumberInput({
  name,
  label,
  initialValue = 0,
  readOnly,
}: {
  name: string;
  label: string;
  initialValue?: number;
  readOnly?: boolean;
}) {
  return (
    <>
      <label for={name} children={label} />
      <input
        type="number"
        name={name}
        value={initialValue}
        readOnly={readOnly}
      />
    </>
  );
}
