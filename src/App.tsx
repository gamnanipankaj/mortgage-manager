import "./app.css";
import React, { useState } from "react";
import { calculateTerms } from "./utils";
import { IAdditionalPayment, IInterestChange } from "./interfaces";
import { BasicLoanDetails } from "./components";

function App() {
  const [principal, setPrincipal] = useState(1000000);
  const [interest, setInterest] = useState(7);
  const [tenure, setTenure] = useState(120);
  const additionalPayments: IAdditionalPayment[] = [];
  const interestChanges: IInterestChange[] = [];

  const { emi, amortizationTable } = calculateTerms({
    principal,
    tenure,
    interest,
    additionalPayments,
    interestChanges,
  });

  const formattedAmortizationTable = amortizationTable.map(
    ({
      month,
      interestPayment,
      principalPayment,
      additionalPayment,
      principalRemaining,
    }) => ({
      month,
      interestPayment: Math.round(interestPayment),
      principalPayment: Math.round(principalPayment),
      additionalPayments: Math.round(additionalPayment),
      principalRemaining: Math.round(principalRemaining),
    })
  );
  console.table(formattedAmortizationTable);

  return (
    <div className="page-container">
      <BasicLoanDetails
        principal={principal}
        setPrincipal={setPrincipal}
        interest={interest}
        setInterest={setInterest}
        tenure={tenure}
        setTenure={setTenure}
      />
      <div className="app-information-bar">
        <h1 className="app-information-bar__emi-key">EMI</h1>
        <h2 className="app-information-bar__emi-value">{Math.ceil(emi)}</h2>
      </div>
    </div>
  );
}

export default App;
