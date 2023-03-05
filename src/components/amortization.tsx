import "./amortization.css";
import React from "react";
import { IAmortization } from "../interfaces";
import { formatAmount } from "../utils/format-amount";
import { getMonthAndYearByOffset } from "../utils/get-month-and-year-by-offset";

const AmortizationHeaders = () => {
  const amortizationHeaders = ["Month", "Interest", "Principal", "Remaining"];
  return (
    <div className="amortization-headers">
      {amortizationHeaders.map((amortizationHeader, index) => (
        <div key={`amortization-header-${index}`}>{amortizationHeader}</div>
      ))}
    </div>
  );
};

const AmortizationEntry = ({
  start,
  month,
  interestPayment,
  principalPayment,
  principalRemaining,
}: {
  start: string;
  month: number;
  interestPayment: number;
  principalPayment: number;
  principalRemaining: number;
}) => {
  return (
    <div className="amortization-entry">
      <p>{getMonthAndYearByOffset(start, month)}</p>
      <p>{formatAmount(Math.ceil(interestPayment))}</p>
      <p>{formatAmount(Math.round(principalPayment))}</p>
      <p>{formatAmount(Math.round(principalRemaining))}</p>
    </div>
  );
};

interface IAmortizationProps {
  start: string;
  amortization: IAmortization[];
}

export const Amortization: React.FC<IAmortizationProps> = ({
  start,
  amortization,
}) => {
  return (
    <div className="amortization-container">
      <AmortizationHeaders />
      <div className="amortization-entry__container">
        {amortization.map((amortizationEntry, index) => (
          <AmortizationEntry
            key={`amortization-entry-${index}`}
            start={start}
            {...amortizationEntry}
          />
        ))}
      </div>
    </div>
  );
};
