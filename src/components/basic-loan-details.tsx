import "./basic-loan-details.css";
import React from "react";
import { ILoanDetails } from "../interfaces";
import { InputSection } from "../common/input-section";

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
      value: principal.toString(),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setPrincipal(+event.target.value),
      step: 100000,
    },
    {
      key: "Interest",
      value: interest.toString(),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setInterest(+event.target.value),
      step: 0.1,
    },
    {
      key: "Tenure",
      value: tenure.toString(),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setTenure(+event.target.value),
      step: 1,
    },
  ];

  return (
    <div className="basic-loan-details-container">
      <InputSection isDefaultOpen canClose={false}>
        {basicLoanDetails.map(({ key, value, step, onChange }, index) => (
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
              step={step}
              onChange={onChange}
            />
          </div>
        ))}
      </InputSection>
    </div>
  );
};
