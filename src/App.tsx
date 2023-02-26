import "./app.css";
import React, { useEffect, useState } from "react";
import { calculateTerms } from "./utils";
import {
  IAdditionalPayment,
  IAmortization,
  IInterestChange,
} from "./interfaces";
import { Amortization, BasicLoanDetails } from "./components";
import { useDebounce } from "./hooks";
import { formatAmount } from "./utils/format-amount";

function App() {
  const [emi, setEmi] = useState(0);
  const [amortization, setAmortization] = useState<IAmortization[]>([]);
  const [principal, setPrincipal] = useState(1000000);
  const [interest, setInterest] = useState(7);
  const [tenure, setTenure] = useState(120);
  const additionalPayments: IAdditionalPayment[] = [];
  const interestChanges: IInterestChange[] = [];

  const debounceCalculateTerms = useDebounce(() => {
    const { emi, amortization } = calculateTerms({
      principal,
      tenure,
      interest,
      additionalPayments,
      interestChanges,
    });
    setEmi(emi);
    setAmortization(amortization);
  }, 500);

  useEffect(() => debounceCalculateTerms(), [principal, interest, tenure]);

  return (
    <div className="page-container">
      <div className="app-information-bar">
        <h2>EMI:</h2>
        <h2>{formatAmount(Math.ceil(emi), { isCurrencySymbol: true })}</h2>
      </div>
      <BasicLoanDetails
        principal={principal}
        setPrincipal={setPrincipal}
        interest={interest}
        setInterest={setInterest}
        tenure={tenure}
        setTenure={setTenure}
      />
      <Amortization amortization={amortization} />
    </div>
  );
}

export default App;
