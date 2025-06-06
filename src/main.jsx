import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51RRc4L2fbpYXk6FHrjkMlfxxxWpFMcRjchTtd5R35D31bneHyV4WU7y0qLAzsMJFKepTbm07FR2le8bEHrKQ4omc00tujE6MGY"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
