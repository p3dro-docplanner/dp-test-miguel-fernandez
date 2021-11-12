import React from "react";
import { Appointment } from "./components/Appointment";
import "./index.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="layout">
      <Appointment></Appointment>
    </div>
  );
};

export default App;
