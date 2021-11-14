import React from "react";

import { Calendar } from "../../components/Calendar";
import { Reschedule } from "../../components/Reschedule";
import { CurrentAppointment } from "../../components/CurrentAppointment";

import moment from "moment";

export const Appointment = () => {

  const formatDateAppointment = (date) => moment(date).format("dddd, DD MMM YYYY [at] HH:mm");

  return (
    <div>
      <CurrentAppointment />
      <Calendar />
      <Reschedule formatDateAppointment={formatDateAppointment}></Reschedule>
    </div>
  );
};
