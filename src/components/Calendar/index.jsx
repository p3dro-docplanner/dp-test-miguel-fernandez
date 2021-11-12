import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import {
  groupsByDay,
  formatDate,
  enumerateDaysBetweenDates,
} from "../../helpers/calendar";
import { Row, Col, Button } from "antd";
import moment from "moment";

const STANDARD_FORMAT_DATE = "YYYY-MM-DD HH:mm:ss";

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState("");

  const groupByDay = groupsByDay(appointments);

  useEffect(() => {
    //control when click on next week
    appointmentService.getAppointments().then((response) => {
      const filteredWeek = filteredAppointments(response.data);
      setAppointments(filteredWeek);
    });
  }, []);

  const filteredAppointments = (data) =>
    data.filter((day) => {
      return (
        formatDate(day).finalStart >= moment().format(STANDARD_FORMAT_DATE) &&
        formatDate(day).finalStart <
          moment().add(6, "days").format(STANDARD_FORMAT_DATE)
      );
    });

  const handleOnClick = (e) => {
    console.log(e.target.value);

    setSelected(e.target.value);
  };

  const renderItems = (group) =>
    groupByDay[group].map((date, index) => {
      return (
        <Button
          key={`${group} ${index}`}
          value={formatDate(date).finalStart + " " + formatDate(date).finalEnd}
          onClick={handleOnClick}
          disabled={date.Taken}
        >
          {formatDate(date).hourStart + ":" + formatDate(date).minutesStart}
        </Button>
      );
    });

  const findDay = (day) => {
    const week = enumerateDaysBetweenDates(formatDate(Date.now()));
    return week[day];
  };

  return (
    <div className="current-appointment">
      {appointments.length > 0 && (
        <Row>
          {Object.keys(groupByDay).map((group, index) => {
            let date;
            date = findDay(group);
            return (
              <div key={index} style={{ flexGrow: "1", display: "flex" }}>
                <Col>
                  <h5>{date && date.day}</h5>
                  <h5>
                    {date && date.number}
                    {date && date.month}
                  </h5>
                  <div style={{ display: "grid" }}>{renderItems(group)}</div>
                </Col>
              </div>
            );
          })}
        </Row>
      )}
      {selected && <button>Ok</button>}
    </div>
  );
};
