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
      {!isOpen && (
        <button
          className="input-section-container__show-button"
          onClick={toggleVisibility}
        >
          {title}
        </button>
      )}
      {isOpen && title && (
        <div
          className="input-section-container__title"
          onClick={toggleVisibility}
        >
          {title}
        </div>
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
