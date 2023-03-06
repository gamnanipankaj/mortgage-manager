import "./amortization.css";
import React from "react";
import { IAmortization } from "../interfaces";
import { formatAmount } from "../utils/format-amount";

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
  interestPayment,
  principalPayment,
  principalRemaining,
  yearHR,
  monthHR,
}: {
  interestPayment: number;
  principalPayment: number;
  principalRemaining: number;
  yearHR: string;
  monthHR: string;
}) => {
  return (
    <div className="amortization-entry">
      <p>{`${yearHR}-${monthHR}`}</p>
      <p>{formatAmount(Math.ceil(interestPayment))}</p>
      <p>{formatAmount(Math.round(principalPayment))}</p>
      <p>{formatAmount(Math.round(principalRemaining))}</p>
    </div>
  );
};

interface IAmortizationProps {
  amortization: IAmortization[];
}

export const Amortization: React.FC<IAmortizationProps> = ({
  amortization,
}) => {
  return (
    <div className="amortization-container">
      <AmortizationHeaders />
      <div className="amortization-entry__container">
        {amortization.map((amortizationEntry, index) => (
          <AmortizationEntry
            key={`amortization-entry-${index}`}
            {...amortizationEntry}
          />
        ))}
      </div>
    </div>
  );
};
