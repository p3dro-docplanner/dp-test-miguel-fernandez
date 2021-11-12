import React from "react";
import { CalendarOutlined } from "@ant-design/icons";

import { Label } from "../Label";
import { Calendar } from "../Calendar";

export const Appointment = () => {
  return (
    <div>
      <div>
        Confirm your appointment with <strong>Dr Simeon Molas</strong>
      </div>
      <div className="current-appointment">
        <CalendarOutlined className="icon" />
        Date for user
      </div>
      <Label text={"Did you have an unexpected situation?"} bold />
      <Label
        text={"You can change the appointment for when it suits you better"}
      />
      <Calendar></Calendar>
    </div>
  );
};
