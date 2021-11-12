import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import { groupsByDay, formatDate } from "../../helpers/calendar";

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState("");

  const groupByDay = groupsByDay(appointments);

  useEffect(() => {
    appointmentService.getAppointments().then((response) => {
      setAppointments(response.data);
    });
  }, []);

  const handleOnClick = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const groupPerDay = () => {
    let listHours = [];

    for (let property in groupByDay) {
      groupByDay[property].map((date, index) =>
        listHours.push(
          <button
            key={`${property} ${index}`}
            value={
              formatDate(date).finalStart + " " + formatDate(date).finalEnd
            }
            onClick={handleOnClick}
            disabled={date.Taken}
          >
            {formatDate(date).hourStart + ":" + formatDate(date).minutesStart}
          </button>
        )
      );
    }

    return listHours;
  };

  return (
    <div className="current-appointment">
      {appointments.length > 0 && <div>{groupPerDay()}</div>}
      {selected && <button>Ok</button>}
    </div>
  );
};
