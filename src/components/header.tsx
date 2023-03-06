import "./header.css";
import React from "react";
import { formatAmount } from "../utils/format-amount";
import { IAmortization } from "../interfaces";
import { calculateTotalInterest } from "../utils/calculate-total-interest";
import { calculateRemainingTerms } from "../utils/calculate-remaining-terms";

interface IHeaderProps {
  start: string;
  emi: number;
  amortization: IAmortization[];
}

export const Header: React.FC<IHeaderProps> = ({
  start,
  emi,
  amortization,
}) => {
  const remainingTerm = calculateRemainingTerms(amortization, start);
  const totalInterest = calculateTotalInterest(amortization);

  return (
    <div className="header-container">
      <div className="header-container_keys">
        <p>Remaining Term</p>
        <p>Interest</p>
        <p>EMI</p>
      </div>
      <div className="header-container_values">
        <p>{remainingTerm}</p>
        <p>
          {formatAmount(Math.ceil(totalInterest), { isCurrencySymbol: true })}
        </p>
        <p>{formatAmount(Math.ceil(emi), { isCurrencySymbol: true })}</p>
      </div>
    </div>
  );
};
