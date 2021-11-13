import React from "react";

import { Calendar } from "../../components/Calendar";
import { Reschedule } from "../../components/Reschedule";
import { CurrentAppointment } from "../../components/CurrentAppointment";

import moment from "moment";

export const Appointment = () => {

  const formatDateAppointment = (date) => `On ${moment(date).format("LLLL")}`;

  return (
    <div>
      <CurrentAppointment></CurrentAppointment>
      <Calendar />
      <Reschedule formatDateAppointment={formatDateAppointment}></Reschedule>
    </div>
  );
};
