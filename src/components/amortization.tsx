import "./amortization.css";
import React from "react";
import { IAmortization } from "../interfaces";

interface IAmortizationProps {
  amortization: IAmortization[];
}

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
  month,
  interestPayment,
  principalPayment,
  principalRemaining,
}: {
  month: number;
  interestPayment: number;
  principalPayment: number;
  principalRemaining: number;
}) => {
  return (
    <div className="amortization-entry">
      <p>{month}</p>
      <p>{Math.round(interestPayment)}</p>
      <p>{Math.round(principalPayment)}</p>
      <p>{Math.round(principalRemaining)}</p>
    </div>
  );
};

export const Amortization = ({ amortization }: IAmortizationProps) => {
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
