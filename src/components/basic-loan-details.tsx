import "./basic-loan-details.css";
import React from "react";
import { ILoanDetails } from "../interfaces";

interface IBasicLoanDetailsProps
  extends Pick<ILoanDetails, "principal" | "interest" | "tenure"> {
  setPrincipal: React.Dispatch<React.SetStateAction<number>>;
  setInterest: React.Dispatch<React.SetStateAction<number>>;
  setTenure: React.Dispatch<React.SetStateAction<number>>;
}

export const BasicLoanDetails = ({
  principal,
  setPrincipal,
  interest,
  setInterest,
  tenure,
  setTenure,
}: IBasicLoanDetailsProps) => {
  const basicLoanDetails = [
    {
      key: "Principal",
      value: principal,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setPrincipal(+event.target.value),
    },
    {
      key: "Interest",
      value: interest,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setInterest(+event.target.value),
    },
    {
      key: "Tenure",
      value: tenure,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setTenure(+event.target.value),
    },
  ];

  return (
    <div className="basic-loan-details-container">
      {basicLoanDetails.map(({ key, value, onChange }, index) => (
        <div
          className="basic-loan-details-grid"
          key={`basic-loan-details-${index}`}
        >
          <p className="basic-loan-details-grid__key">{key}</p>
          <input
            type="number"
            className="basic-loan-details-grid__value"
            value={value}
            inputMode="numeric"
            step="0.1"
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
};
