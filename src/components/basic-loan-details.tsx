import React from "react";
import { ILoanDetails } from "../interfaces";
import { InputSection } from "../common/input-section";
import { InputGrid } from "../common/input-grid";

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
  const inputs = [
    {
      key: "Principal",
      type: "number",
      value: principal.toString(),
      step: 100000,
      min: 1,
      max: Infinity,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setPrincipal(+event.target.value),
    },
    {
      key: "Interest",
      type: "number",
      value: interest.toString(),
      step: 0.1,
      min: 0.1,
      max: 100,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setInterest(+event.target.value),
    },
    {
      key: "Tenure",
      type: "number",
      value: tenure.toString(),
      step: 1,
      min: 1,
      max: 720,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setTenure(+event.target.value),
    },
  ];

  return (
    <InputSection isDefaultOpen canClose={false}>
      <InputGrid inputs={inputs} />
    </InputSection>
  );
};
