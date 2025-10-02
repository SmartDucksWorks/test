import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const el = document.getElementById("root");
if (!el) {
  // Helpful runtime guard so we don't silently blank-screen
  throw new Error('#root element not found in index.html');
}

createRoot(el).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
