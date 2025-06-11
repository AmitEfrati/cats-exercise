import React from "react";

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
  return (
    <>
      <input
        type="text"
        value={name}
        placeholder={`Mouse ${index + 1} `}
        onChange={(e) => onChange(index, e.target.value)}
      />
      <button type="button" onClick={() => onRemove(index)}>
        Remove
      </button>
    </>
  );
}
