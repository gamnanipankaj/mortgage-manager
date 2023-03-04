import "./app.css";
import React, { useEffect, useState } from "react";
import { calculateTerms } from "./utils";
import {
  IAdditionalPayment,
  IAmortization,
  IInterestChange,
} from "./interfaces";
import { Amortization, BasicLoanDetails } from "./components";
import { useDebounce, useLocalStorage } from "./hooks";
import { formatAmount } from "./utils/format-amount";
import { AdditionalPayments } from "./components/additional-payments";

const defaults = {
  principal: 1000000,
  interest: 7,
  tenure: 240,
} as const;

function App() {
  const [principal, setPrincipal] = useLocalStorage<number>(
    "principal",
    defaults.principal
  );
  const [interest, setInterest] = useLocalStorage<number>(
    "interest",
    defaults.interest
  );
  const [tenure, setTenure] = useLocalStorage<number>(
    "tenure",
    defaults.tenure
  );
  const [additionalPayments, setAdditionalPayments] = useLocalStorage<
    IAdditionalPayment[]
  >("additionalPayments", []);
  const interestChanges: IInterestChange[] = [];

  const [emi, setEmi] = useState(0);
  const [amortization, setAmortization] = useState<IAmortization[]>([]);

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

  useEffect(
    () => debounceCalculateTerms(),
    [principal, interest, tenure, additionalPayments]
  );

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
      <AdditionalPayments
        tenure={tenure}
        additionalPayments={additionalPayments}
        setAdditionalPayments={setAdditionalPayments}
      />
      <Amortization amortization={amortization} />
    </div>
  );
}

export default App;
