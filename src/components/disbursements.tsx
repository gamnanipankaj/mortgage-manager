import React, { useState } from "react";
import { InputGrid } from "../common/input-grid";
import { InputSection } from "../common/input-section";
import { ListInput } from "../common/list-input";
import { IDisbursement } from "../interfaces";
import { calculateCurrentMonthOffset } from "../utils/calculate-current-month-offset";
import { calculateMonthOffset } from "../utils/calculate-month-offset";
import { formatAmount } from "../utils/format-amount";
import { getMonthAndYearByOffset } from "../utils/get-month-and-year-by-offset";

interface IDisbursementProps {
  start: string;
  tenure: number;
  disbursements: IDisbursement[];
  setDisbursements: React.Dispatch<React.SetStateAction<IDisbursement[]>>;
}

export const Disbursements: React.FC<IDisbursementProps> = ({
  start,
  tenure,
  disbursements,
  setDisbursements,
}) => {
  const [month, setMonth] = useState<number>(
    calculateCurrentMonthOffset(start)
  );
  const [amount, setAmount] = useState<number>(100000);

  const inputs = [
    {
      key: "Month",
      type: "month",
      value: getMonthAndYearByOffset(start, Math.max(month - 1, 0)),
      step: 1,
      min: 1,
      max: tenure,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setMonth(calculateMonthOffset(start, event.target.value) + 1),
    },
    {
      key: "Disbursement",
      type: "number",
      value: amount.toString(),
      step: 100000,
      min: 1,
      max: 100,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(+event.target.value),
    },
  ];

  const checkIsAmountValid = (amount: number) => !isNaN(amount) && amount > 0;
  const checkIsMonthValid = (month: number) =>
    !isNaN(month) && month > 0 && month <= tenure;

  const onAddDisbursement = () => {
    if (checkIsMonthValid(month) && checkIsAmountValid(amount)) {
      const updatedInterestChanges = [
        ...disbursements,
        {
          month,
          amount,
        },
      ].sort(({ month: m1 }, { month: m2 }) => m1 - m2);
      setDisbursements(updatedInterestChanges);
    }
  };

  const onRemoveDisbursement = (index: number) => {
    disbursements.splice(index, 1);
    setDisbursements([...disbursements]);
  };

  return (
    <InputSection title="Disbursements">
      <ListInput
        uI="disbursement"
        items={disbursements.map(({ month, amount }) => [
          getMonthAndYearByOffset(start, month - 1),
          formatAmount(amount, { isCurrencySymbol: true }),
        ])}
        onRemove={onRemoveDisbursement}
      />
      <InputGrid inputs={inputs} onSave={onAddDisbursement} />
    </InputSection>
  );
};
