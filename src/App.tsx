import "./app.css";
import React, { useState } from "react";
import { calculateTerms } from "./utils";
import { IAdditionalPayment, IInterestChange } from "./interfaces";
import { Amortization, BasicLoanDetails } from "./components";

function App() {
  const [principal, setPrincipal] = useState(1000000);
  const [interest, setInterest] = useState(7);
  const [tenure, setTenure] = useState(120);
  const additionalPayments: IAdditionalPayment[] = [];
  const interestChanges: IInterestChange[] = [];

  const { emi, amortization } = calculateTerms({
    principal,
    tenure,
    interest,
    additionalPayments,
    interestChanges,
  });

  return (
    <div className="page-container">
      <div className="app-information-bar">
        <h2>EMI:</h2>
        <h2>&#x20B9; {Math.ceil(emi)}</h2>
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
