import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProovedorTema } from "./contextos/contextoTema";


ReactDOM.render(
  <React.StrictMode>
    <ProovedorTema>
      <App />
    </ProovedorTema>
  </React.StrictMode>,
  document.getElementById("root")
);
