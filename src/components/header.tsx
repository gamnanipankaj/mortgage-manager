import "./header.css";
import React from "react";
import { formatAmount } from "../utils/format-amount";
import { IAmortization } from "../interfaces";
import { calculateTotalInterest } from "../utils/calculate-total-interest";
import { calculateRemainingTerms } from "../utils/calculate-remaining-terms";
import { calculateRemainingPrincipal } from "../utils/calculate-remaining-principal";

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
  const remainingPrincipal = calculateRemainingPrincipal(start, amortization);
  const remainingTerm = calculateRemainingTerms(amortization, start);
  const totalInterest = calculateTotalInterest(amortization);

  return (
    <div className="header-container">
      <div className="header-container_keys">
        <p>Principal*</p>
        <p>Term*</p>
        <p>Interest</p>
        <p>EMI</p>
      </div>
      <div className="header-container_values">
        <p>
          {formatAmount(Math.ceil(remainingPrincipal), {
            isCurrencySymbol: true,
          })}
        </p>
        <p>{remainingTerm}</p>
        <p>
          {formatAmount(Math.ceil(totalInterest), { isCurrencySymbol: true })}
        </p>
        <p>{formatAmount(Math.ceil(emi), { isCurrencySymbol: true })}</p>
      </div>
    </div>
  );
};
