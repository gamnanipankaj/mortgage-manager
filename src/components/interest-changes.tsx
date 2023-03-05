import React, { useState } from "react";
import { IInterestChange } from "../interfaces";
import { InputSection } from "../common/input-section";
import { InputGrid } from "../common/input-grid";
import { ListInput } from "../common/list-input";

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
  const checkIsNotDuplicate = (m: number, i: number) =>
    !interestChanges.some(
      ({ month, interest }) => m === month && i === interest
    );

  const onAddInterestChange = () => {
    if (
      checkIsMonthValid(month) &&
      checkIsInterestValid(interest) &&
      checkIsNotDuplicate(month, interest)
    ) {
      const updatedInterestChanges = [
        ...interestChanges,
        {
          month,
          interest,
        },
      ].sort(({ month: m1 }, { month: m2 }) => m1 - m2);
      setInterestChanges(updatedInterestChanges);
    }
  };

  const onRemoveInterestChange = (index: number) => {
    interestChanges.splice(index, 1);
    setInterestChanges([...interestChanges]);
  };

  return (
    <InputSection title="Interest Changes">
      <ListInput
        uI="interest-change"
        items={interestChanges.map(({ month, interest }) => [
          month,
          `${interest} %`,
        ])}
        onRemove={(index) => onRemoveInterestChange(index)}
      />
      <InputGrid inputs={inputs} onSave={onAddInterestChange} />
    </InputSection>
  );
};
