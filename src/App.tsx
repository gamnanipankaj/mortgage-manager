import { calculateTerms } from "./utils";
import "./app.css";
import { IAdditionalPayment } from "./interfaces";

function App() {
  const principal = 1000000;
  const interest = 7.2;
  const tenure = 120;
  const additionalPayments: IAdditionalPayment[] = [
    {
      amount: 100000,
      month: 4,
    },
    {
      amount: 100000,
      month: 12,
    },
  ];

  const { emi, amortizationTable } = calculateTerms({
    principal,
    tenure,
    interest,
    additionalPayments,
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
      <div className="app-information-bar">
        <h1 className="app-information-bar__emi-key">EMI</h1>
        <h2 className="app-information-bar__emi-value">{Math.ceil(emi)}</h2>
      </div>
    </div>
  );
}

export default App;
