import { useCallback } from "react";

type TMouseInputProps = {
  name: string;
  index: number;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
};

export function MouseInput({
  name,
  index,
  onChange,
  onRemove,
}: TMouseInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(index, e.target.value);
    },
    [index, onChange]
  );

  const handleRemove = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder={`Mouse ${index + 1} `}
        onChange={handleChange}
      />
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
