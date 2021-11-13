import React from "react";
import { CalendarOutlined } from "@ant-design/icons";

import { Label } from "../Label";
import { useSelector } from "react-redux";
import moment from "moment";

export const CurrentAppointment = () => {
  const appointment = useSelector((state) => state.appointment.appointment);

  const formatDateAppointment = (date) => `On ${moment(date).format("LLLL")}`;

  return (
    <div data-testid="appointment">
      <div data-testid="appointment-current">
        Confirm your appointment with <strong>Dr Simeon Molas</strong>
      </div>
      <div data-testid="current" className="current-appointment">
        <CalendarOutlined className="icon" />
        {formatDateAppointment(appointment)}
      </div>
      <Label text={"Did you have an unexpected situation?"} bold />
      <Label
        text={"You can change the appointment for when it suits you better"}
      />
    </div>
  );
};
