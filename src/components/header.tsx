import "./header.css";
import React from "react";
import { formatAmount } from "../utils/format-amount";
import { IAmortization } from "../interfaces";

interface IHeaderProps {
  emi: number;
  amortization: IAmortization[];
}

export const Header: React.FC<IHeaderProps> = ({ emi, amortization }) => {
  const totalPrincipal = amortization.reduce(
    (tP, { principalPayment }) => tP + principalPayment,
    0
  );
  const totalInterest = amortization.reduce(
    (tI, { interestPayment }) => tI + interestPayment,
    0
  );

  return (
    <div className="header-container">
      <div className="header-container_keys">
        <p>Principal</p>
        <p>Interest</p>
        <p>EMI</p>
      </div>
      <div className="header-container_values">
        <p>
          {formatAmount(Math.ceil(totalPrincipal), { isCurrencySymbol: true })}
        </p>
        <p>
          {formatAmount(Math.ceil(totalInterest), { isCurrencySymbol: true })}
        </p>
        <p>{formatAmount(Math.ceil(emi), { isCurrencySymbol: true })}</p>
      </div>
    </div>
  );
};
