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
  additionalPayment,
  yearHR,
  monthHR,
}: {
  interestPayment: number;
  principalPayment: number;
  principalRemaining: number;
  additionalPayment: number;
  yearHR: string;
  monthHR: string;
}) => {
  return (
    <div className="amortization-entry">
      <p>{`${yearHR}-${monthHR}`}</p>
      <p>
        {formatAmount(Math.round(interestPayment), { isCurrencySymbol: true })}
      </p>
      <div>
        <p className="pt-2 border-0">
          {formatAmount(
            Math.round(principalPayment) - Math.round(additionalPayment),
            { isCurrencySymbol: true }
          )}
        </p>
        {additionalPayment > 0 && (
          <p className="pt-2 border-0">
            +
            {formatAmount(Math.round(additionalPayment), {
              isCurrencySymbol: true,
            })}
          </p>
        )}
      </div>
      <p>
        {formatAmount(Math.round(principalRemaining), {
          isCurrencySymbol: true,
        })}
      </p>
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
