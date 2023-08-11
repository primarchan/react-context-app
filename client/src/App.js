import { useState } from "react";
import "./App.css";
import OrderPage from "./pages/OrderPage";
import SummaryPage from "./pages/SummaryPage";
import CompletePage from "./pages/CompletePage";

function App() {
  const [step, setStep] = useState(0);

  return (
    <div style={{ padding: "4rem" }}>
      {step === 0 && <OrderPage setStep={setStep} />}
      {step === 1 && <SummaryPage setStep={setStep} />}
      {step === 2 && <CompletePage setStep={setStep} />}
    </div>
  );
}

export default App;
