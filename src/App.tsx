import { calculateTerms } from "./utils";
import "./app.css";

function App() {
  const principal = 1000000;
  const interest = 7.2;
  const tenure = 120;

  const { emi } = calculateTerms({ principal, tenure, interest });

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
