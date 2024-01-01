import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ContextData from "./Data";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
    <ContextData>
      <App />
    </ContextData>
    </BrowserRouter>
  </React.StrictMode>,
);
