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
  const [showMore, setShowMore] = useState(false);

  const groupByDay = groupsByDay(appointments);

  useEffect(() => {
    //control when click on next week
    appointmentService.getAppointments().then((response) => {
      const filteredWeek = filteredAppointments(response.data);
      setAppointments(filteredWeek);
    });
  }, []);

  const handleShowMore = () => setShowMore(!showMore);

  const handleOnClick = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const filteredAppointments = (data) =>
    data.filter((day) => {
      return (
        formatDate(day).finalStart >= moment().format(STANDARD_FORMAT_DATE) &&
        formatDate(day).finalStart <
          moment().add(6, "days").format(STANDARD_FORMAT_DATE)
      );
    });
  const findDay = (day) => {
    const week = enumerateDaysBetweenDates(formatDate(Date.now()));
    return week[day];
  };

  const renderItems = (group) =>
    groupByDay[group].map((date, index) => {
      return (
        <Button
          type="primary"
          key={`${group} ${index}`}
          value={formatDate(date).finalStart + " " + formatDate(date).finalEnd}
          onClick={handleOnClick}
          disabled={date.Taken}
          className="button-calendar"
        >
          {formatDate(date).hourStart + ":" + formatDate(date).minutesStart}
        </Button>
      );
    });

  return (
    <div className="current-appointment">
      {appointments.length > 0 && (
        <Row>
          {Object.keys(groupByDay).map((group, index) => {
            let date;
            date = findDay(group);
            return (
              <div key={index} className="calendar">
                <Col className={showMore ? "show-more" : "show-less"}>
                  <h5 className="week-day">{date && date.day}</h5>
                  <h5 className="date">
                    {date && `${date.number}  ${date.month}`}
                  </h5>
                  <div className={showMore ? "column-show-more" : "column"}>
                    {renderItems(group)}
                  </div>
                </Col>
              </div>
            );
          })}
        </Row>
      )}
      <div className="button-more">
        <Button onClick={handleShowMore}>
          {showMore ? "Show less" : "Show more"}
        </Button>
      </div>
    </div>
  );
};
