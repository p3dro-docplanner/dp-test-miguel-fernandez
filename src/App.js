import React from "react";
import { Appointment } from "./containers/Appointment";
import "./index.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="layout">
      <Appointment />
    </div>
  );
};

export default App;
