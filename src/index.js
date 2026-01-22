import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.min.css";
import { BrowserRouter } from "react-router-dom";
import { CalendarProvider } from "./context/CalendarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <CalendarProvider>
      <App />
    </CalendarProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
