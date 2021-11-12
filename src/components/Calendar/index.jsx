import React, { useState, useEffect } from "react";
import appointmentService from "../../services/appointmentService";
import {
  groupsByDay,
  formatDate,
  enumerateDaysBetweenDates,
  isWeekRange,
} from "../../helpers/calendar";
import { Row, Col, Button } from "antd";
import { useDispatch } from "react-redux";
import { appointmentActions } from "../../store/slices/appointmentSlice";

export const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState("");
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const modifyHandler = (data) =>
    dispatch(appointmentActions.updateAppointment(data));

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
    modifyHandler(e.target.value);
    setSelected(e.target.value);
  };

  const filteredAppointments = (data) => data.filter((day) => isWeekRange(day));
  const findDay = (day) => {
    const week = enumerateDaysBetweenDates(formatDate(Date.now()));
    return week[day];
  };

  const renderItems = (group) =>
    groupByDay[group].map((date, index) => {
      return (
        <button
          type="primary"
          key={`${group} ${index}`}
          value={formatDate(date).finalStart}
          onClick={handleOnClick}
          disabled={date.Taken}
          className="button-calendar"
        >
          {formatDate(date).hourStart + ":" + formatDate(date).minutesStart}
        </button>
      );
    });

  return (
    <div className="current-appointment">
      {appointments.length > 0 && (
        <Row>
          <Button>{"<"}</Button>
          {Object.keys(groupByDay).map((group, index) => {
            const date = findDay(group);
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
          <Button>{">"}</Button>
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
