import "./input-grid.css";
import React from "react";

interface IInputGridProps {
  inputs: {
    key: string;
    type: string;
    value: string | number;
    step: number;
    min: number;
    max: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
  onSave?: () => void;
}

export const InputGrid: React.FC<IInputGridProps> = ({ inputs, onSave }) => {
  return (
    <div className="input-grid-container">
      {inputs.map(({ key, value, type, step, min, max, onChange }, index) => (
        <div
          className="input-grid-container__row-item"
          key={`input-grid-row-item-${key}-${index}`}
        >
          <p>{key}</p>
          <input
            type={type}
            value={value}
            step={step}
            min={min}
            max={max}
            onChange={onChange}
          />
        </div>
      ))}
      {onSave && (
        <button className="input-grid-container__save" onClick={onSave}>
          Save
        </button>
      )}
    </div>
  );
};
