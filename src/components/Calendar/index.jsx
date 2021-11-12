import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import moment from "moment";

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    appointmentService.getAppointments().then((response) => {
      console.log(response.data);
      setAppointments(response.data);
    });
  }, []);

  const groupsByDay =
    appointments &&
    appointments.reduce((acc, date) => {
      const weekDay = `${moment(date.Start).week()}-${moment(
        date.Start
      ).day()}`;

      if (!acc[weekDay]) {
        acc[weekDay] = [];
      }

      acc[weekDay].push(date);
      return acc;
    }, {});

  const groupPerDay = () => {
    /* const startDate = moment(appointment.Start);
      const weekDay = startDate.format("ddd");
      const numberDay = startDate.format("DD");
      const monthName = startDate.format("MMM");
      const hour = startDate.format("HH");
      const minutes = startDate.format("mm");*/

    console.log(groupsByDay);

    //return <div>{new Date(appointment.Start).getDate()}</div>;
  };

  return (
    <div className="current-appointment">
      {appointments.length > 0 && <div>{groupPerDay()}</div>}
    </div>
  );
};
