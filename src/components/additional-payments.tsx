import "./additional-payments.css";
import React, { useState } from "react";
import { IAdditionalPayment } from "../interfaces";
import { formatAmount } from "../utils/format-amount";

interface IAdditionalPaymentProps {
  tenure: number;
  additionalPayments: IAdditionalPayment[];
  setAdditionalPayments: React.Dispatch<
    React.SetStateAction<IAdditionalPayment[]>
  >;
}

const additionalPaymentsText = "Additional Payments";
const defaults = {
  amount: 0,
  month: 0,
} as const;

export const AdditionalPayments = ({
  tenure,
  additionalPayments,
  setAdditionalPayments,
}: IAdditionalPaymentProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const checkIsAmountValid = (amount: number) => !isNaN(amount) && amount > 0;
  const checkIsMonthValid = (month: number) =>
    !isNaN(month) && month > 0 && month <= tenure;

  const onAddAdditionalPayment = () => {
    if (checkIsAmountValid(amount) && checkIsMonthValid(month)) {
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
    <>
      {!isOpen && (
        <button
          className="additional-payments-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {additionalPaymentsText}
        </button>
      )}
      {isOpen && (
        <div className="additional-payments-input-container">
          {additionalPayments.map(({ amount, month }, index) => (
            <div
              className="show-additional-payments-container"
              key={`show-additional-payments-${index}`}
            >
              <p>{month}</p>
              <p>{formatAmount(amount, { isCurrencySymbol: true })}</p>
              <button onClick={() => onRemoveAdditionalPayment(index)}>
                -
              </button>
            </div>
          ))}
          <div className="mt-2">
            {inputs.map(({ key, type, value, step, min, max, onChange }) => (
              <div
                className="additional-payments-input-container__grid"
                key={`additional-payment-input-grid-${key}`}
              >
                <label>{key}</label>
                <input
                  type={type}
                  value={value}
                  onChange={onChange}
                  step={step}
                  min={min}
                  max={max}
                  inputMode="numeric"
                />
              </div>
            ))}
          </div>
          <button className="border px-2" onClick={onAddAdditionalPayment}>
            +
          </button>
          <button
            className="additional-payments-input-container__close-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};
