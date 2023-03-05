import "./input-section.css";
import React, { PropsWithChildren, useState } from "react";

interface IInputSectionProps {
  title?: string;
  isDefaultOpen?: boolean;
  canClose?: boolean;
}

export const InputSection: React.FC<PropsWithChildren<IInputSectionProps>> = ({
  title,
  isDefaultOpen = false,
  canClose = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen);
  const toggleVisibility = () => setIsOpen(!isOpen);

  return (
    <div className="input-section-container">
      {title && (
        <button
          className="input-section-container__show-button"
          onClick={toggleVisibility}
        >
          {title}
        </button>
      )}
      {isOpen && children}
      {isOpen && canClose && (
        <button
          className="input-section-container__hide-button"
          onClick={toggleVisibility}
        >
          Close
        </button>
      )}
    </div>
  );
};
