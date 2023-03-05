import "./list-input.css";
import React from "react";

interface IListInputProps {
  uI: string;
  items: [number | string, number | string][];
  onRemove: (index: number) => void;
}

export const ListInput: React.FC<IListInputProps> = ({
  uI,
  items,
  onRemove,
}) => {
  return (
    <div className="list-input-container">
      {items.map(([meta, main], index) => (
        <div className="list-input-container-entry" key={`${uI}-list-${index}`}>
          <p>{meta}</p>
          <p>{main}</p>
          <button onClick={() => onRemove(index)}>X</button>
        </div>
      ))}
    </div>
  );
};
