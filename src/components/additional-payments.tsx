import React, { useState } from "react";
import { IAdditionalPayment } from "../interfaces";
import { formatAmount } from "../utils/format-amount";
import { InputSection } from "../common/input-section";
import { InputGrid } from "../common/input-grid";
import { ListInput } from "../common/list-input";
import { getMonthAndYearByOffset } from "../utils/get-month-and-year-by-offset";

interface IAdditionalPaymentProps {
  start: string;
  tenure: number;
  additionalPayments: IAdditionalPayment[];
  setAdditionalPayments: React.Dispatch<
    React.SetStateAction<IAdditionalPayment[]>
  >;
}

const defaults = {
  amount: 0,
  month: 0,
} as const;

const checkIsAmountValid = (amount: number) => !isNaN(amount) && amount > 0;
const checkIsMonthValid = (month: number, tenure: number) =>
  !isNaN(month) && month > 0 && month <= tenure;

export const AdditionalPayments = ({
  start,
  tenure,
  additionalPayments,
  setAdditionalPayments,
}: IAdditionalPaymentProps) => {
  const [amount, setAmount] = useState<number>(defaults.amount);
  const [month, setMonth] = useState<number>(defaults.month);

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
      key: "Amount",
      type: "number",
      value: amount.toString(),
      step: 100000,
      min: 1,
      max: Infinity,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(+event.target.value),
    },
  ];

  const onAddAdditionalPayment = () => {
    if (checkIsAmountValid(amount) && checkIsMonthValid(month, tenure)) {
      const updatedAdditionalPayments = [
        ...additionalPayments,
        {
          amount,
          month,
        },
      ].sort(({ month: m1 }, { month: m2 }) => m1 - m2);
      setAdditionalPayments(updatedAdditionalPayments);
    }
  };

  const onRemoveAdditionalPayment = (index: number) => {
    additionalPayments.splice(index, 1);
    setAdditionalPayments([...additionalPayments]);
  };

  return (
    <InputSection title="Additional Payments">
      <ListInput
        uI="additional-payments"
        items={additionalPayments.map(({ month, amount }) => [
          getMonthAndYearByOffset(start, month - 1),
          formatAmount(amount, { isCurrencySymbol: true }),
        ])}
        onRemove={(index: number) => onRemoveAdditionalPayment(index)}
      />
      <InputGrid inputs={inputs} onSave={onAddAdditionalPayment} />
    </InputSection>
  );
};
