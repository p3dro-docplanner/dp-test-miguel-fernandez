import React from "react";
import { useSelector } from "react-redux";

export const Reschedule = () => {
  const appointment = useSelector((state) => state.appointment);
  console.log(appointment);

  return appointment.changed ? <div>Here</div> : <div>Fake</div>;
};
