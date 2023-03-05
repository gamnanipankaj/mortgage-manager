import "./interest-changes.css";
import React, { useState } from "react";
import { IInterestChange } from "../interfaces";
import { InputSection } from "../common/input-section";

interface IInterestChangesProps {
  tenure: number;
  interestChanges: IInterestChange[];
  setInterestChanges: React.Dispatch<React.SetStateAction<IInterestChange[]>>;
}

export const InterestChanges: React.FC<IInterestChangesProps> = ({
  tenure,
  interestChanges,
  setInterestChanges,
}) => {
  const [month, setMonth] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);

  const inputs = [
    {
      key: "Month",
      type: "number",
      value: month.toString(),
      step: 1,
      min: 1,
      max: tenure,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setMonth(+event.target.value),
    },
    {
      key: "Interest",
      type: "number",
      value: interest.toString(),
      step: 100000,
      min: 1,
      max: 100,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setInterest(+event.target.value),
    },
  ];

  const checkIsInterestValid = (interest: number) =>
    !isNaN(interest) && interest > 0 && interest < 100;
  const checkIsMonthValid = (month: number) =>
    !isNaN(month) && month > 0 && month <= tenure;

  const onAddInterestChange = () => {
    if (checkIsMonthValid(month) && checkIsInterestValid(interest)) {
      const updatedInterestChanges = [
        ...interestChanges,
        {
          month,
          interest,
        },
      ];
      setInterestChanges(updatedInterestChanges);
    }
  };

  const onRemoveInterestChange = (index: number) => {
    interestChanges.splice(index, 1);
    setInterestChanges([...interestChanges]);
  };

  return (
    <InputSection title="Interest Changes">
      <div className="interest-changes-container">
        <div>
          {interestChanges.map(({ month, interest }, index) => (
            <div
              className="interest-changes-list-entry"
              key={`interest-changes-entry-${index}`}
            >
              <p>{month}</p>
              <p>
                {interest}
                {" %"}
              </p>
              <button
                className="interest-change-list-entry__delete-button"
                onClick={() => onRemoveInterestChange(index)}
              >
                -
              </button>
            </div>
          ))}
        </div>
        <div className="interest-change-input-container">
          {inputs.map(
            ({ key, value, type, step, min, max, onChange }, index) => (
              <div
                className="interest-change-input-container__grid"
                key={`interest-change-input-container-${index}`}
              >
                <label>{key}</label>
                <input
                  type={type}
                  value={value}
                  step={step}
                  min={min}
                  max={max}
                  onChange={onChange}
                  inputMode="numeric"
                />
              </div>
            )
          )}
          <button
            className="interest-change-input-container__add-entry"
            onClick={() => onAddInterestChange()}
          >
            +
          </button>
        </div>
      </div>
    </InputSection>
  );
};
