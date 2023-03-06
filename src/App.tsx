import "./app.css";
import React, { useEffect, useState } from "react";
import { calculateTerms } from "./utils/calculate-terms";
import {
  IAdditionalPayment,
  IAmortization,
  IInterestChange,
} from "./interfaces";
import { Amortization, BasicLoanDetails, InterestChanges } from "./components";
import { useDebounce, useLocalStorage } from "./hooks";
import { AdditionalPayments } from "./components/additional-payments";
import { Header } from "./components/header";
import { formatMonthAndYear } from "./utils/format-month-and-year";

const defaults = {
  principal: 1000000,
  interest: 7,
  tenure: 240,
} as const;

const App: React.FC<{}> = () => {
  const [start, setStart] = useLocalStorage<string>(
    "start",
    formatMonthAndYear(new Date())
  );
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
  const [interestChanges, setInterestChanges] = useLocalStorage<
    IInterestChange[]
  >("interestChanges", []);

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
    [principal, interest, tenure, additionalPayments, interestChanges]
  );

  return (
    <div className="page-container">
      <Header start={start} emi={emi} amortization={amortization} />
      <BasicLoanDetails
        start={start}
        setStart={setStart}
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
      <InterestChanges
        tenure={tenure}
        interestChanges={interestChanges}
        setInterestChanges={setInterestChanges}
      />
      <Amortization start={start} amortization={amortization} />
    </div>
  );
};

export default App;
