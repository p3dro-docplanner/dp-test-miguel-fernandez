import React from "react";
import { CalendarOutlined } from "@ant-design/icons";

import { Label } from "../Label";
import { Calendar } from "../Calendar";
import { Reschedule } from "../Reschedule";

export const Appointment = () => {
  return (
    <div data-testid="appointment">
      <div data-testid="appointment-current">
        Confirm your appointment with <strong>Dr Simeon Molas</strong>
      </div>
      <div data-testid="current" className="current-appointment">
        <CalendarOutlined className="icon" />
        Date for user
      </div>
      <Label text={"Did you have an unexpected situation?"} bold />
      <Label
        text={"You can change the appointment for when it suits you better"}
      />
      <Calendar />
      <Reschedule></Reschedule>
    </div>
  );
};
