import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CatsProvider } from "./state/cats.store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CatsProvider>
      <App />
    </CatsProvider>
  </React.StrictMode>
);

reportWebVitals();
